pipeline {
    agent any

    stages {
        stage('Clonar o Repositório') { 
            steps {
                git branch: 'main', url: 'https://github.com/gabrielthiego/teste-api-ebac'
            }
        }

        stage('Iniciar Servidor') {
            steps {
                bat 'start /b npm start'
            }
        }

        stage('Instalar Dependências') {
            steps {
                bat 'npm install'
            }
        }

        stage('Executar Testes') {
            steps {
                bat 'npm test'
            }
        }
    }
}
