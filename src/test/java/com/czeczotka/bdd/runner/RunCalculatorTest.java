package com.czeczotka.bdd.runner;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
		  features = "classpath:cucumber/calculator.feature" ,
		  glue = "com.czeczotka.bdd.steps",
		plugin = "com.infostretch.qmetrytestmanager.result.TestExecution" ,
		monochrome = true
       
)
public class RunCalculatorTest {
}
