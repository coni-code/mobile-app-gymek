# Use an official Apache image as the base image
FROM httpd:2.4

# Copy your Apache configuration into the container
COPY ./apache-config.conf /usr/local/apache2/conf/httpd.conf

# Copy the wait-for-it script
COPY wait-for-it.sh /usr/local/bin/wait-for-it

# Make the script executable
RUN chmod +x /usr/local/bin/wait-for-it

# Start the Apache web server only after the backend service is ready
CMD ["wait-for-it", "backend:8000", "--", "httpd-foreground"]
