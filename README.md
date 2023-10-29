# Instructions to Build and Run Web Service

Follow these steps to build and run the web service along with the database:

1. **Pull Docker Images:**

   First, pull the required Docker images from DockerHub:

   ```bash
   docker pull mlflops/web-service:latest
   docker pull mlflops/docker_db:1.0
   ```

2. **Run Docker Compose:**

   Start the services using Docker Compose:

   ```bash
   docker-compose up
   ```

3. **Access the Web Service:**

   Once the services are up and running, open your web browser and navigate to:

   [http://localhost:8080](http://localhost:8080)

   This will take you to the web service.
