# Use an official PostgreSQL image as the base image
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_DB=mlflops
ENV POSTGRES_USER=bms
ENV POSTGRES_PASSWORD=mlflops123

# Copy SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/
