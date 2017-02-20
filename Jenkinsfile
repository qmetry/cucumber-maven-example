node('ILSIEDISON') {
    def workSpaceHome = pwd()
    stage('Clean') {
        deleteDir()
    }
    stage('Checkout') {
        checkout scm
    }
    stage('Grunt Process') {
        sh """
            cd Grunt
            npm install
            grunt --serverpath="${serverpath}" --apikey="${apikey}" --testRunName="${testRunName}" --platform="${platform}" --labels="${labels}" --components="${components}" --versions="${versions}" --sprint="${sprint}" --comment="${comment}"
        """
    }
    stage('Run') {
       withMaven(jdk: 'JDK8', maven: 'Maven-3-3-9', mavenLocalRepo: '', mavenOpts: '', mavenSettingsFilePath: '') {
           sh "mvn test"
       }
    }
}