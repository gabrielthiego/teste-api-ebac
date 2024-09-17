pipeline {
    agent any

    stages {
        stage('Clonar o Repositório') {
            steps {
                git 'https://github.com/gabrielthiego/teste-api-ebac'
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
