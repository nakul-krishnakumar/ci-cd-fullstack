pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "2023bcs0010nakul"
        ROLL_NUMBER = "2023bcs0010"

        FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/${ROLL_NUMBER}_frontend"
        BACKEND_IMAGE = "${DOCKERHUB_USERNAME}/${ROLL_NUMBER}_backend"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/nakul-krishnakumar/ci-cd-fullstack.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker build -t ${FRONTEND_IMAGE}:latest ./frontend"
                    sh "docker build -t ${BACKEND_IMAGE}:latest ./backend"
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                    sh "docker push ${BACKEND_IMAGE}:latest"
                }
            }
        }
    }

    post {
        always {
            sh "docker logout"
        }
    }
}