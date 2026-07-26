//we have something called as hooks in cucumber
//just how we have in mocha framework before after tests same like that we have 
//Before-runs before every scenario , After , 
// BeforeStep-runs before every step/test cases, AfterStep, BeforeAll- runs before all scenarios,AfterAll
//NOTE-Hooks are used for setup and teardown the environment before and after each scenario.
//refer https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/hooks.md for reference
const {After, Before,AfterStep,Status} = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
Before(async function () {
    // This hook will be executed before all scenarios
    console.log("i am first");
    const browser = await playwright.chromium.launch({
      headless: false,
  });
  const context = await browser.newContext();
    this.page =  await context.newPage();
  });

  AfterStep( async function ({result}) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    //below code is to capture screenshots, so after every step/test cases the results will be passed to the result variable written above
    //and then we have status keyword from the cucumber package which we used to verify failed test cases
    //below code we got from the https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/hooks.md
    if (result.status === Status.FAILED) {
      
      await this.page.screenshot({ path: 'screenshot1.png' });
      
      console.log("Screenshot logged");

    }
  });
  After(async function () {
    console.log("i am last");
    
    
  });


//   Before({tags: "@foo"}, function () {   //so this will run if the scenarios are having foo tag
//   // This hook will be executed before scenarios tagged with @foo
// });

// Before({tags: "@foo and @bar"}, function () { //so this will run if the scenarios are having foo  and bar tag
//   // This hook will be executed before scenarios tagged with @foo and @bar
// });

// Before({tags: "@foo or @bar"}, function () {   //so this will run if the scenarios are having foo or bar tag
//   // This hook will be executed before scenarios tagged with @foo or @bar
// });