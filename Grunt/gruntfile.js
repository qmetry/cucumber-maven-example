var fs = require('fs');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
//JsonConfig is defined for basic structure in pom.xml
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
	
	//Taking Parameters from grunt command which is send from jenkins. 
	var serverpath = grunt.option('serverpath');
	var apikey = grunt.option('apikey');
	var testRunName = grunt.option('testRunName');
	var platform = grunt.option('platform');
	var labels = grunt.option('labels');
	var components = grunt.option('components');
	var versions = grunt.option('versions');
	var sprint = grunt.option('sprint');
	var comment = grunt.option('comment');
	
	
	//Checking required params
	if (typeof serverpath === "undefined" || serverpath === null || serverpath === "") {
		throw new Error("serverpath Required.");
	}
	if (typeof apikey === "undefined" || apikey === null || apikey === "") {
		throw new Error("apikey Required.");
	}
	if (typeof testRunName === "undefined" || testRunName === null || testRunName === "") {
		throw new Error("testRunName Required.");
	}
	if (typeof platform === "undefined" || platform === null || platform === "") {
		throw new Error("platform Required.");
	}
    
	
    grunt.registerTask("pomfile", "Run loop to replace css in jsp file by minified css",
            function() {
    	
    	//getting projects pom.xml
    	var data = fs.readFileSync("..//pom.xml", "utf-8");
    	parseString(data, function(err, result){
            if(err) console.log(err);
            var json = result;
            
            //for updating <Build> values in existing Pom.xml
            json.project.build = JsonConfig.Build;
            json.project.build.plugins.plugin.configuration.systemPropertyVariables.server = serverpath;
            json.project.build.plugins.plugin.configuration.systemPropertyVariables.apiKey = apikey;
            json.project.build.plugins.plugin.configuration.systemPropertyVariables.testRunName = testRunName;
            json.project.build.plugins.plugin.configuration.systemPropertyVariables.platform = platform;
			if (typeof labels != "undefined" || labels != null || labels != "") {
				json.project.build.plugins.plugin.configuration.systemPropertyVariables.labels = labels;
			}
            if (typeof components != "undefined" || components != null || components != "") {
				json.project.build.plugins.plugin.configuration.systemPropertyVariables.components = components;
			}
			if (typeof versions != "undefined" || versions != null || versions != "") {
				json.project.build.plugins.plugin.configuration.systemPropertyVariables.versions = versions;
			}
			if (typeof sprint != "undefined" || sprint != null || sprint != "") {
				json.project.build.plugins.plugin.configuration.systemPropertyVariables.sprint = sprint;
			}
			if (typeof comment != "undefined" || comment != null || comment != "") {
				json.project.build.plugins.plugin.configuration.systemPropertyVariables.comment = comment;
			}
			
            //for updating <repositories> values in existing Pom.xml
            json.project.repositories = JsonConfig.repositories;
            
            //for updating <dependencies> values in existing Pom.xml
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
            
            //Writing Pom.xml File
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(json);
            fs.writeFileSync("..//pom.xml", xml, "utf-8");
        });
    });
	grunt.registerTask('default', ["pomfile"]);
};