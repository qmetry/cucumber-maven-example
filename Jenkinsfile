#!grunt command in Grunt Process Stage takes Parameters of Key value pair.
Key is use in internal process that can't be change. ex --serverpath, --apikey= etc...
Value is taking from jenkins Parameters which is configure in jenkins with specific name written in ${}
ex ${serverpath} means serverpath is a build parameters in jenkins with serverpath name.!#
node('master') {
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
       withMaven(jdk: 'JDK', maven: 'maven3', mavenLocalRepo: '', mavenOpts: '', mavenSettingsFilePath: '') {
           sh "mvn test"
       }
    }
}