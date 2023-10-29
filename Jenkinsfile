pipeline {
    agent any

    stages {
        stage('Pull Database Image') {
            steps {
                script {
                    // Define the Docker image name and tag
                    def imageName = 'mlflops/docker_db'
                    def imageTag = 'latest'

                    // Pull the Database Docker image from Docker Hub
                    sh "docker pull ${imageName}:${imageTag}" // Use the defined variables here
                }
            }
        }

        stage('Run Database Service') {
            steps {
                script {
                    // Define the Docker container name
                    def containerName = 'database-service-container'

                    // Run the Database service container from the pulled image
                    sh "docker run --name ${containerName} -d -p 5432:5432 ${imageName}:${imageTag}" // Use the defined variables here
                }
            }
        }
    }
}
