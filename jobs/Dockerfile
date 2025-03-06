FROM php:8.0

WORKDIR /app

RUN apt-get update && apt-get install -y libpq-dev && docker-php-ext-install pdo_pgsql
COPY composer.json composer.lock ./
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# RUN composer install

COPY . .

CMD ["sh", "-c", "php artisan migrate && php artisan serve --host=0.0.0.0 --port=8000"]