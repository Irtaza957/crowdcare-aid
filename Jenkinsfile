pipeline {
    agent {label 'webserver-azure'}
  
    stages {
        // stage('sonarscanner'){
        //     steps {
        //     script {
        //         def scannerHome = tool 'SonarScanner';
        //         withSonarQubeEnv() {
        //         sh "${scannerHome}/bin/sonar-scanner"
        // }
        //         }
        //     }
        // }
        stage('App Build') {
            steps {
                script {
                    // Use for select on Branch name
                    //def branchName = sh(returnStdout: true, script: 'echo $GIT_BRANCH | cut -d "/" -f 2').trim()
                    def WEB_PORT = 9090
                    def ADMIN_PORT = 9093
                    def imageTag = ""
                    if (GIT_BRANCH == 'development') {
                        imageTag = 'dev-'
                        WEB_PORT = '9093'
                        ADMIN_PORT = '9083'
                        BASE_URL = 'https://dev.crowdapi.devsoul.net/'
                    } 
                    else if (GIT_BRANCH == 'stagging') {
                        imageTag = 'stg-'
                        WEB_PORT = '9092'
                        ADMIN_PORT = '9082'
                        BASE_URL = 'https://stg.crowdapi.devsoul.net/'
                    }
                    else if (GIT_BRANCH == 'main') {
                     WEB_PORT = '9091'
                     ADMIN_PORT = '9081'
                     BASE_URL = 'https://crowdapi.devsoul.net/'
                    }
                    sh """
                        echo 'WEB_PORT='$WEB_PORT > .env
                        echo 'ADMIN_PORT='$ADMIN_PORT >> .env
                        echo 'TAG='$imageTag >> .env
                    """
                    def changed_files = sh(returnStdout: true, script: 'git diff-tree --no-commit-id --name-only -r HEAD^ HEAD').trim()
                    println "changed_files: ${changed_files}"                 
                    if (changed_files.contains('apps/crowdcareaid-web') || changed_files.contains('libs/')) {
                       println "Changes detected in apps/crowdcareaid-web folder. Building Docker image..."
                       //sh "mv apps/crowdcareaid-web/.env.$GIT_BRANCH apps/crowdcareaid-web/.env"
                       sh "docker build -t crowdcareaid:${imageTag}latest ."
                        } else {
                            println "no change detected in webapp"
                        }
                    
                    if (changed_files.contains('apps/crowdcareaid-admin') || changed_files.contains('libs/')) {
                        println "Changes detected in apps/crowdcareaid-admin folder. Building Docker image..."
                        def project = "crowdcareaid-admin"
                        //sh "mv apps/crowdcareaid-admin/.env.$GIT_BRANCH apps/crowdcareaid-adminl/.env"
                        sh "docker build --build-arg PROJECT=${project} -t crowdcareaid-admin:${imageTag}latest ."
                      } else {
                        println "no change detected in admin panel"
                      }
                    sh "docker compose up -d --force-recreate"
                    }
                }
            }
    }
     post {
         always {
             script {
                 slackSend(
                     color: 'info',
                     message: "Build started for job: ${currentBuild.fullDisplayName}",
                     channel: 'devops'
                 )
             }
         }

    success {
             script {
                 slackSend(
                     color: 'good',
                     message: "Build successful for job: ${currentBuild.fullDisplayName}",
                     channel: 'devops'
                 )
             }
         }
         failure {
             script {
                 slackSend(
                     color: 'danger',
                     message: "Build failed for job: ${currentBuild.fullDisplayName}",
                     channel: 'devops'
                 )
             }
         }
     }
    }
