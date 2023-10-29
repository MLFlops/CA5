pipeline {
    agent any

    stages {
        stage('Pull WebServer Image') {
            steps {
                script {
                    // Define the Docker image name and tag
                    def imageName = 'mlflops/web-server'
                    def imageTag = 'latest'

                    // Pull the Database Docker image from Docker Hub
                    sh "docker pull ${imageName}:${imageTag}" // Use the defined variables here
                }
            }
        }

        stage('Run WebServer Service') {
            steps {
                script {
                    // Define the Docker container name
                    def containerName = 'web-service-container'

                    // Run the Database service container from the pulled image
                    sh "docker run --name ${containerName} -d -p 5000:5000 ${imageName}:${imageTag}" // Use the defined variables here
                }
            }
        }
    }
}