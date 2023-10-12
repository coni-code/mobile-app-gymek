# Use an official MySQL image as the base image
FROM mysql:8.0

# Copy the .env file into the container
COPY .env /etc/mysql/.env

# Expose the default MySQL port
EXPOSE 3306

# Custom configuration file by copying it into the container
COPY custom-mysql.cnf /etc/mysql/conf.d/

# Initialize the database by copying SQL scripts into the container
COPY init.sql /docker-entrypoint-initdb.d/

# Note: If you need to initialize the database with custom scripts or configuration,
# make sure to provide those files and adjust the paths accordingly.

# Start the MySQL server
CMD ["mysqld"]
