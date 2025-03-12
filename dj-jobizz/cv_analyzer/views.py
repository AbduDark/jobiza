from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from jobs.models import Job
from cv_analyzer.permissions import IsCandidate
from cv_analyzer.models import CVAnalysis
from .serializers import CVUploadSerializer
from .utils import CVProcessor, CVMatcher

class CVAnalyzeView(APIView):
    permission_classes = [IsCandidate]
    def post(self, request):
        serializer = CVUploadSerializer(data=request.data)
        if serializer.is_valid():
            file = serializer.validated_data['file']
            try:
                job = Job.objects.get(id=serializer.validated_data['job_id'])
            except Job.DoesNotExist:
                return Response({"error": "Job not found."}, status=status.HTTP_400_BAD_REQUEST)
            
            job_description = f'{job.description}, {job.requirements}, {job.title}, {job.job_type}'

            
            processor = CVProcessor()
            try:
                text = processor.extract_text(file)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
            analysis = processor.analyze_cv(text, job_description)
            tfidf_score = processor.calculate_similarity(text, job_description)
            
            matcher = CVMatcher(processor.nlp)
            semantic_score = matcher.semantic_similarity(text, job_description)
            
            final_score = (tfidf_score * 0.6) + (semantic_score * 0.4)

            # Create CVAnalysis object
            cv_analysis = CVAnalysis.objects.create(
                raw_text=text,
                skills=analysis['skills'],
                candidate=request.user,
                experience=analysis['experience'],
                education=analysis['education'],
                tfidf_score=tfidf_score,
                semantic_score=semantic_score,
                final_score=final_score
            )
            result = {
                "analysis": analysis,
                "tfidf_score": tfidf_score,
                "semantic_score": semantic_score,
                "final_score": final_score
            }
            return Response(result, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
