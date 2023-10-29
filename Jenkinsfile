pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_VERSION = '1.29.2'
        DOCKER_COMPOSE_URL = "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-Linux-x86_64"
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Initialize') {
            steps {
                script {
                    sh "curl -L ${DOCKER_COMPOSE_URL} -o docker-compose"
                    sh 'chmod +x docker-compose'
                    sh './docker-compose --version'
                }
            }
        }

        stage('Build and Push Web Server Image') {
            steps {
                script {
                    docker.build("mlflops/web-server")
                    docker.withRegistry('https://registry.example.com', 'docker-credentials') {
                        docker.image("mlflops/web-server").push('latest')
                    }
                }
            }
        }

        stage('Build and Push Database Image') {
            steps {
                script {
                    docker.build("mlflops/docker_db")
                    docker.withRegistry('https://registry.example.com', 'docker-credentials') {
                        docker.image("mlflops/docker_db").push('latest')
                    }
                }
            }
        }

        stage('Start Services with Docker Compose') {
            steps {
                script {
                    sh "./docker-compose up -d"
                }
            }
        }

        stage('Run Tests or Further Steps') {
            steps {
                // Add your test or other steps here
            }
        }
    }

    post {
        always {
            script {
                sh "./docker-compose down"
            }
        }
    }
}
