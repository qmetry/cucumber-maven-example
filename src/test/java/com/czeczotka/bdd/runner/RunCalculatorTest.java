package com.czeczotka.bdd.runner;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
		  features = "classpath:cucumber/calculator.feature" ,
		  glue = "com.czeczotka.bdd.steps",
		monochrome = true,
format = "json:target/cucumber-json-report.json"

)
public class RunCalculatorTest {
}
