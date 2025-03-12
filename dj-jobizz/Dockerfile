# Use the official Python image as the base
FROM python:3.10

# Set environment variables to prevent bytecode generation and buffer output
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project files
COPY . /app/

# Expose the port that the app runs on
EXPOSE 8000

# Run migrations and collect static files
RUN python manage.py migrate && python manage.py collectstatic --noinput

# Start the Gunicorn server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "Jobizz.wsgi:application"]