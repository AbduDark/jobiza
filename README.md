# jobiza
 #sry D: This is our new structure
 =
├── user-service/        ⇨⇨⇨         Django-based User Service
│   ├── Dockerfile       ⇨⇨⇨         Dockerfile for building the User Service
│   ├── manage.py        ⇨⇨⇨         Django management script
│   ├── requirements.txt ⇨⇨⇨         Python dependencies
│   ├── user_service/    ⇨⇨⇨         Django project directory
│   │   ├── __init__.py  ⇨⇨⇨
│   │   ├── settings.py  ⇨⇨⇨         Django settings (configured for PostgreSQL)
│   │   ├── urls.py      ⇨⇨⇨         URL routing
│   │   └── wsgi.py      ⇨⇨⇨         WSGI entry point
│   └── apps/            ⇨⇨⇨         Django apps
│       └── users/       ⇨⇨⇨         Users app
│           ├── migrations/ ⇨⇨⇨      Database migrations
│           ├── __init__.py
│           ├── admin.py   ⇨⇨⇨       Admin panel configuration
│           ├── apps.py    ⇨⇨⇨       App configuration
│           ├── models.py  ⇨⇨⇨       User-related models (e.g., User, Profile)
│           ├── serializers.py  ⇨⇨⇨    API serializers
│           ├── tests.py   ⇨⇨⇨       Unit tests
│           └── views.py   ⇨⇨⇨       API views
├── job-service/         ⇨⇨⇨         Laravel-based Job Service
│   ├── Dockerfile       ⇨⇨⇨         Dockerfile for building the Job Service
│   ├── artisan          ⇨⇨⇨         Laravel command-line tool
│   ├── composer.json    ⇨⇨⇨         PHP dependencies
│   ├── app/             ⇨⇨⇨         Application code
│   │   ├── Http/        ⇨⇨⇨         HTTP layer
│   │   │   ├── Controllers/ ⇨⇨⇨     Controllers
│   │   │   │   ├── JobController.php  ⇨⇨⇨         Job management logic
│   │   │   │   └── ApplicationController.php ⇨⇨⇨  Application logic
│   │   │   └── ...      ⇨⇨⇨         Middleware, requests, etc.
│   │   └── Models/      ⇨⇨⇨         Eloquent models
│   │       ├── Job.php  ⇨⇨⇨        Job model
│   │       └── Application.php ⇨⇨⇨  Application model
│   ├── config/          ⇨⇨⇨        Configuration files (e.g., database.php)
│   ├── database/        ⇨⇨⇨         Database-related files
│   │   ├── migrations/  ⇨⇨⇨         Migration files
│   │   └── seeders/     ⇨⇨⇨         Seed data (optional)
│   ├── public/          ⇨⇨⇨         Public assets
│   ├── resources/       ⇨⇨⇨         Views and resources
│   ├── routes/          ⇨⇨⇨         Route definitions
│   │   └── api.php      ⇨⇨⇨         API routes
│   └── tests/           ⇨⇨⇨         Laravel tests
├── notification-service/  ⇨⇨⇨         Node.js-based Notification Service
│   ├── Dockerfile       ⇨⇨⇨         Dockerfile for building the Notification Service
│   ├── app.js           ⇨⇨⇨         Main application file
│   ├── package.json     ⇨⇨⇨         Node.js dependencies
│   ├── routes/          ⇨⇨⇨         Route definitions
│   │   └── notifications.js ⇨⇨⇨      Notification API routes
│   └── services/        ⇨⇨⇨         Business logic
│       └── fcmService.js ⇨⇨⇨        Firebase Cloud Messaging integration
├── dashboard-service/    ⇨⇨⇨        service for the web dashboard
│   ├── Dockerfile        ⇨⇨⇨       Builds and serves the frontend
│   ├── package.json      ⇨⇨⇨       Dependencies (e.g., for a React app)
│   ├── src/              ⇨⇨⇨       Frontend source code
│   └── ...               ⇨⇨⇨       Other frontend files
├── config/              ⇨⇨⇨         Shared configuration files
│   └── nginx.conf       ⇨⇨⇨         NGINX configuration for reverse proxy
├── init-db/             ⇨⇨⇨         PostgreSQL initialization scripts
│   └── init.sql         ⇨⇨⇨         SQL script to create databases
├── docker-compose.yml   ⇨⇨⇨         Docker Compose file to orchestrate services
└── .gitignore           ⇨⇨⇨         Git ignore file

.
#User Service (Django): Handles user authentication and profiles.
=
#Job Service (Laravel): Manages job postings and applications, with APIs like:
=
###POST /api/jobs: Create a new job (for companies).
###GET /api/jobs: Retrieve jobs with filters.
###PUT /api/jobs/{id}: Update a job.
###DELETE /api/jobs/{id}: Delete a job.
###GET /api/applications?job_id={id}: Retrieve applications for a job (for companies).
###PUT /api/applications/{id}/status: Update application status (for companies).
#Notification Service (Node.js): Handles sending notifications, with APIs like:
###POST /api/notifications/send: Send notifications to specified users.

#Inter-Service Communication
=
##APIs: RESTful endpoints for synchronous calls (e.g., frontend to services, Notification Service to User Service).
##Message Queue: RabbitMQ for asynchronous events (e.g., job postings triggering notifications).
##Authentication: JWT tokens included in API requests, validated by each service.
