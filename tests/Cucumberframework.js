//So from now we will see the cucumber framework, till now we were using playwright plus mocha framework
//now we will see cucumber framework
//so cucumber framework is nothing but an extra interface added over our code so the code is more readable
//NOTE-Cucumber is an open-source test automation framework designed to support Behavior-Driven Development (BDD). It bridges the communication gap between technical and non-technical team members by allowing users to write test cases in plain, human-readable language.Instead of reading complex programming code, stakeholders like Product Owners, Business Analysts, and manual testers can easily read, understand, and approve automated test scenarios.
//first we need to install cucumber packages in playwright, so for that we will use the command - npm install @cucumber/cucumber
//once package is installed now we have to understand how cucumber framework works
//go to this site https://github.com/cucumber/cucumber-js here u will find everydetail
//so we need to create one features folder first which is required for cucumber
//inside that we need .feature file and its related step-definition .js file
//in feature file we will have the skeleton in the below manner
//Feature: Greeting    //this is the test suite

//  Scenario: Say hello       //this is the test scenario and below when and then are the test cases/steps. //we can write multiple when and then in a single scenario.
//   When the greeter says hello
//    Then I should have heard "hello"

//now once we have the feature file next we need the step-definition json file
//so we have created the Ecommerce.features file and Step_Definition.js file check that out
//follow how we wrote the code there.


//these are simple english we are writing so anything we can write and with these texts we have to create our test cases name.
//inside double quotes it treats as dynamic values

//also one more thing before creating feature file we need to install one plugin which is cucumber(Gherkin) Gherkin is the language the way we write the feature file .
  //now run this command npx cucumber-js    this will find the features folder and will try to execute the .feature file
  //since we have feature but dont have step-definition file so it will give the error and will provide the skeleton of
  //functions we need to write.

  //now from the console output copy paste the required test cases skeleton in the step definition file