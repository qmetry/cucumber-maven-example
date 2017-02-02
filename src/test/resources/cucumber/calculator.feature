Feature: Calculator
  As a user
  I want to use a calculator
  So that I don't need to calculate myself

  Scenario: Add two numbers
    Given I have a calculator
    When I add 2 and 3
    Then the result should be 5
    
    Scenario: Add two numbers
    Given I have a calculator
    When I add 4 and 3
    Then the result should be 7
    
    Scenario: Add two numbers
    Given I have a calculator
    When I add 1 and 3
    Then the result should be 4
    
    Scenario: Add two numbers
    Given I have a calculator
    When I add 2 and 1
    Then the result should be 3