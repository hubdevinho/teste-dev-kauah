FROM composer:2 AS composer

FROM php:8.4-cli

RUN apt-get update && apt-get install -y --no-install-recommends \
        libpq-dev \
        libsqlite3-dev \
        libzip-dev \
        libonig-dev \
        unzip \
    && docker-php-ext-install pdo pdo_pgsql pdo_sqlite mbstring zip bcmath \
    && pecl install xdebug \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer /usr/bin/composer /usr/bin/composer
COPY docker/backend/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

WORKDIR /app
