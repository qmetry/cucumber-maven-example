# cucumber-maven-example
This is sample cucumber + maven  project in Java. It shows how to upload test result file on JIRA instance using [QMetry for JIRA - Test Management](https://marketplace.atlassian.com/plugins/com.infostretch.QmetryTestManager/cloud/overview).  


### Run test

please update these details in `pom.xml` file. 

1. API Key - You can get this value by logging into your JIRA instance. Then click on QMetry Menu -> Automation API page. 
2. Base URL - QMetry Automation API URL. This information is also available in Automation API page. 
3. And Other optional params. Refer [QMetry docs](https://qmetrytestdocs.atlassian.net/wiki/) for more details.

After providing these details, you are ready to start test.

```
mvn test
```

It will generate `surefile-reports`. 

Addionally, right after test completion, test result file will be uploaded on your JIRA instance if you have provided correct details in properties file. 
