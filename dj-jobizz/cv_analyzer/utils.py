import pdfplumber
from docx import Document
import spacy
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class CVProcessor:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        self.skill_list = [line.strip() for line in open('cv_analyzer/skills.txt', 'r')]

    def extract_text(self, file):
        if file.name.endswith('.pdf'):
            text = ""
            with pdfplumber.open(file) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
            return text.strip()
        elif file.name.endswith('.docx'):
            doc = Document(file)
            return "\n".join(para.text for para in doc.paragraphs if para.text)
        else:
            raise ValueError("Unsupported file type. Please upload a PDF or DOCX file.")

    def analyze_cv(self, text, job_description):
        doc = self.nlp(text)
        skills = self.extract_skills(doc, job_description)
        experience = self.extract_experience(text)
        education = self.extract_education(text)
        return {
            "raw_text": text,
            "skills": skills,
            "experience": experience,
            "education": education
        }

    def extract_skills(self, doc, job_description):
        text = doc.text
        found_skills = []
        for skill in self.skill_list:
            pattern = re.compile(r"\b" + re.escape(skill) + r"\b", re.IGNORECASE)
            if pattern.search(text):
                found_skills.append(skill)
        # Remove duplicates
        found_skills = list(set(found_skills))
        # Filter out skills that are mentioned in the job description
        # found_skills = [skill for skill in found_skills if skill.lower() in job_description.lower()]
        
        return found_skills

    def extract_experience(self, text):
        # Looks for patterns like "3 years" or "5+ years"
        matches = re.findall(r"(\d+)\+?\s*years", text, re.IGNORECASE)
        return matches

    def extract_education(self, text):
        education_keywords = ["Bachelor", "Master", "B.Sc", "M.Sc", "PhD", "Diploma"]
        found = []
        for keyword in education_keywords:
            if keyword.lower() in text.lower():
                found.append(keyword)
        return list(set(found))

    def calculate_similarity(self, cv_text, job_description):
        # Calculate TF-IDF cosine similarity between the CV and job description
        cv_text = cv_text.lower()
        job_text = job_description.lower()
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform([cv_text, job_text])
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
        return similarity[0][0] * 100

class CVMatcher:
    def __init__(self, nlp_model=None):
        self.nlp = nlp_model if nlp_model else spacy.load("en_core_web_sm")

    def semantic_similarity(self, text1, text2):
        doc1 = self.nlp(text1)
        doc2 = self.nlp(text2)
        return doc1.similarity(doc2) * 100