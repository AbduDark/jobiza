FROM python:3.10

ENV PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=jobizz.settings

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    gcc \
    netcat-openbsd \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
# 
COPY wait-for-it.sh /app/wait-for-it.sh

RUN chmod +x /app/wait-for-it.sh
# Copy entrypoint FIRST
COPY entrypoint.sh /app/entrypoint.sh

RUN chmod +x /app/entrypoint.sh

# Copy requirements and install
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . /app/

# Setup entrypoint

COPY entrypoint.sh .
RUN chmod +x /app/entrypoint.sh

# Expose port 8000
EXPOSE 8000

# Run migrations and collect static files
 RUN python manage.py collectstatic --noinput

# Ensure Gunicorn is Installed
RUN pip install gunicorn

ENTRYPOINT ["/app/entrypoint.sh"]
# Run migrations and start server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "jobizz.wsgi:application"]
