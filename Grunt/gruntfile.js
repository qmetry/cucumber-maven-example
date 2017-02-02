var fs = require('fs');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config.properties');
var JsonConfig = {
		  "Build": {
			    "plugins": {
			      "plugin": {
			        "groupId": "org.apache.maven.plugins",
			        "artifactId": "maven-surefire-plugin",
			        "version": "2.18.1",
			        "configuration": {
			          "systemPropertyVariables": {
			            "server": "",
			            "apiKey": "",
			            "testRunName": "",
			            "platform": "",
			            "labels": "",
			            "components": "",
			            "versions": "",
			            "sprint": "",
			            "comment": ""
			          }
			        }
			      }
			    }
			},
			    "dependencies": 
			    	{
			    		    "groupId": "com.infostretch.qmetrytestmanager",
			    		    "artifactId": "qmetrytestmanager-maven-plugin",
			    		    "version": "1.0.2"
			    },
			    "repositories": {
			    	"repository": {
			    	    "id": "qmetrytestmanager-mvn-repo",
			    	    "name": "QMetry Test Manager Maven Repository",
			    	    "url": "https://raw.github.com/infostretch/qmetry-test-manager-for-jira/mvn-repo/"
			    	  }
			    }
};
module.exports = function(grunt) {
	
	var serverpath = grunt.option('serverpath');
	var apikey = grunt.option('apikey');

    
    grunt.registerTask("pomfile", "Run loop to replace css in jsp file by minified css",
            function() {
    	
    	var data = fs.readFileSync("..//pom.xml", "utf-8");
    	parseString(data, function(err, result){
            if(err) console.log(err);
            var json = result;
            //for build
            json.project.build = JsonConfig.Build;
            json.project.build.plugins.plugin.configuration.systemPropertyVariables.server = serverpath;
            json.project.build.plugins.plugin.configuration.systemPropertyVariables.apiKey = apikey;
            json.project.build.plugins.plugin.configuration.systemPropertyVariables.testRunName = properties.get('main.testRunName');
            json.project.build.plugins.plugin.configuration.systemPropertyVariables.platform = properties.get('main.platform');
            json.project.build.plugins.plugin.configuration.systemPropertyVariables.labels = properties.get('main.labels');
            json.project.build.plugins.plugin.configuration.systemPropertyVariables.components = properties.get('main.components');
            json.project.build.plugins.plugin.configuration.systemPropertyVariables.versions = properties.get('main.versions');
            json.project.build.plugins.plugin.configuration.systemPropertyVariables.sprint = properties.get('main.sprint');
            json.project.build.plugins.plugin.configuration.systemPropertyVariables.comment = properties.get('main.comment');
            //for repo
            json.project.repositories = JsonConfig.repositories;
            
            //for dep
            var length = json.project.dependencies[0].dependency.length;
            var hasTag = false;
            var i = null;
            for (i = 0; length > i; i += 1) {
            	if (json.project.dependencies[0].dependency[i].groupId == "com.infostretch.qmetrytestmanager") {
            		hasTag = true;
            	}
            }
            console.log(hasTag);
            if(hasTag==false)
            {
            	json.project.dependencies[0].dependency[length]=JsonConfig.dependencies;
            }
            
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(json);
            fs.writeFileSync("..//pom.xml", xml, "utf-8");
        });
    });
	grunt.registerTask('default', ["pomfile"]);
};