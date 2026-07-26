const {Given,When,Then} = require("@cucumber/cucumber") //first we need to import the necessary package from cucumber fo it will recognize what is given , when etc annotations.
//below code is required for our test cases
const {POManager} = require('../../pageobjects/POManager');//make sure import is from the correct folder because currently we are in stepdefinition folder 
//to go out we use ../
const {expect}=require("@playwright/test"); 
//we are importing playwright object/keyword from playwright/test below to utilize the chromium.launch() method.
//const playwright=require("@playwright/test") ;

Given('Login to Ecommerce application with {string} and {string}',{timeout: 100 * 1000}, async function (username, password) { //username and password values are coming from the feature file and the same is passed on to this function.
  // Write code here that turns the phrase above into concrete actions
  //above the timeout we have given because by default cucumber will wait for only 5 seconds for execution of steps if we 
  //want to wait longer then we have to specifically mention that.
  //const browser= await playwright.chromium.launch({headless:false});
  //inside playwright we have chromium.launch() method that will define our browser
  //also by default cucumber will run tests in headless mode we need to specifically add the property as bove to tell to run in head mode
  //const context = await browser.newContext();//for this browser we need to write one code above
  //const page = await context.newPage();// we are writing these 2 lines of code for browser and page because we cannot use the page fixture directly because thats with test annotation in playwright but we are using cucumbes given , when , then etc  so we need to write this
  this.poManager = new POManager(this.page);
  //in cucumber there is a concept called world constructor which means we can increase the scope of any variable just by adding this.
  //so above we are defining pomanager but scope is only till this given code to increase the scope we use this.
  //other wise we need to define the variable globally.
  const products = this.page.locator(".card-body");
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goTo(); //add async keyword before the function above
  await loginPage.validLogin(username,password);//in cucumber we drive the data from the feature file and not data file
});

When('Add {string} to Cart', async function (productname) {
  // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
     await this.dashboardPage.searchProductAddCart(productname);
     await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productname) {
  // Write code here that turns the phrase above into concrete actions
   const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productname);
    await cartPage.Checkout();

});

When('Enter Valid details and place the order',  async function () {
  // Write code here that turns the phrase above into concrete actions
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(this.orderId);
});

Then('Verify Order is present in the order history', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.dashboardPage.navigateToOrders();
   const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(this.orderId);
   expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

//now to run this we need to execute npx cucumber-js and add flaf --exit because be default it will not come out of loop
//we need to specifically tell
//also while executing we wil see a box on terminal as well, inside it will be written what to do for disabling that
//so we will create a cucumber.js file and write the code there.


//so below we are writing code for another scenario mentioned on ecommerce feature file-

Given('a login to Ecommerce2 application with {string} and {string}', {timeout: 100 * 1000}, async function (username,password) {
        
        // page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
          const userName = this.page .locator('#username');
          const signIn = this.page .locator("#signInBtn");
          const cardTitles =  this.page .locator(".card-body a");
          await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
          console.log(await this.page.title());
          //css 
         await userName.fill(username);
         await this.page .locator("[type='password']").fill(password);
         await signIn.click();   
        });


        Then('Verify Error message is displayed', async function () {
          await expect(this.page .locator("[style*='block']")).toContainText('Incorrect');

        });


        //so basically we have added 2 scenarios and for those scenarios i have added the test cases here in one file
        //go and check the feature file
        //there we have added tags above the scenarios and in order to execute based on tags use the below command-
        //npx cucumber-js --tags "tagname" --exit
        //now if you have multiple feature files then you can chose which file to run you can do that by below command-
        //npx cucumber-js features/Ecommerce.feature --exit
        //to run tests in parallel we have the below code, also this code is to generate the html report
        //npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html
        //one limitation in cucumber is that we cannot run feature files in parallel but we can run scenarios parallely
        //so we can add multiple scenarios in one feature file and we can run those in parallel
        //also on the above command we used --parallel 2 flag this means run 2 scenarios parallely.
        //now to parameterize the scenarios check feature file 2nd scenario , you will understand what needs to be done and the syntaxes.
        //compare first and second scenario.
        //now sometimes our test cases fail but we can retry the execution i mean cucumber will retry 
        // for that we have to add  flag in the command.
        //-- retry 2  , meaning retry 2 times before marking the test cases as failed
        //now similarly how we have done earlier u can add the cucumber scripts(meaning commands) in package.json file to run it easily.


        