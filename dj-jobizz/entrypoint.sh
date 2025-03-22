#!/bin/sh

# Wait for PostgreSQL using wait-for-it
./wait-for-it.sh db:5432 --timeout=30 --strict -- echo "PostgreSQL is up!"

# Run migrations
python manage.py migrate
