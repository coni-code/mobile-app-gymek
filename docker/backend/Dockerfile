# Use an official PHP image with FPM as the base image
FROM php:8.2-fpm

# Set the working directory within the container
WORKDIR /var/www/html

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libzip-dev \
    libonig-dev \
    unzip \
    git \
    && docker-php-ext-configure zip \
    && docker-php-ext-install -j$(nproc) zip

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the Symfony application code into the container
COPY ./backend /var/www/html

# Install application dependencies with Composer
RUN composer install --no-scripts --no-autoloader

# Autoload and dump the Composer autoload and Symfony cache
RUN composer dump-autoload --optimize
RUN php bin/console cache:warmup

# Expose the port where PHP-FPM is listening (usually 9000)
EXPOSE 9000

# 4. Create a non-root user to run the application.
RUN useradd -u $UID -d /home/devuser devuser
RUN mkdir -p /home/devuser/.composer && \
    chown -R devuser:devuser /home/devuser

USER devuser
RUN echo "export PATH=$PATH:/var/www/html/vendor/bin" >> /home/devuser/.bashrc

# Start PHP-FPM
CMD ["php-fpm"]
