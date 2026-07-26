 //here we will apply page object pattern for the client app test code, so please refer the page object folder and compare 
 //with this code and the clientApp(2) code to get the understanding
 
 //here we will also see how to create test data in a separate file and use the data in our test
 //so we created a json file clientSpecAppPOtestdata.json in Utils folder where we craeted an array whcih contains multiple json test data.
 const {test, expect} = require('@playwright/test');
 const {POManager} = require('../pageobjects/POManager');
//so below what we did is we are importing the test data file, since this is json file we need to first convert
//it into String because usually json file will have encoding hence we convert it into string using Stringify method in Json class 
// and then into Javascript object. using parse method in json class.
 const testdata =JSON.parse(JSON.stringify(require("../Utils/ClientSpecAppPOtestdata.json")));


 //to run the tests in parallel mode we will write the below code once but  before all the tests 
 //test.describe.configure({mode:'parallel'});
 //similarly to run it in serial below code
 //test.describe.configure({mode:'serial'});//now u must be wondering if by default playwright runs the tests inside the file
 //in serial then why we need the above code , so this is because if we write the above code , then if one test fails 
 //then the below tests will not run they will be skipped.

 //also if we want to skip any tests then we just need to use test.skip like test.only.

 //now if we need to identify the regression test cases or smoke test cases or lets say we want to group any number of test cases so that those test cases comes under one group
 //so for that we will use like below
 //test("@Web Client App login using custom fixture", async ({page,testdataset})=>

  //to run these group of test cases based on tag just add the below flag after the execution run command on terminal.
  //--grep @Web


//now to use this test data we need to use a for loop as we have 2 sets of test data

for (const data of testdata)//data is a variable which will hold the dataset one by one from array testdata and run the loop
{

  //below check there is a syntax change for test name , so as in Playwright we cannot execute test with same class name
  //hence we are using product name from each data set to append with our test name.
 test(`Client App login for ${data.productname}`, async ({page})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();//notice here we are not creating new object just we are calling the method
     //on PO manager which returns the object and we are cathing in a variable and using that we can call the other methods of login page, same for all other below just go through u will understand.
     await loginPage.goTo();
     await loginPage.validLogin(data.username,data.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(data.productname);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productname);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();



 });
}
 
//now there is a another way we can create test data and use
//which is through the custom fixture
//to do that we will create a java script file inside utils folder where we will import the 
//test module from the playwright and then extend its feature


 const {customtest} = require("../Utils/test-base");//importing the test-base.js file here
 //below we are using the customtest instead of test and we are passing the custom fixture along with page

customtest("Client App login using custom fixture", async ({page,testdataset})=>
 {
   const poManager = new POManager(page);
    
     
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();//notice here we are not creating new object just we are calling the method
     //on PO manager which returns the object and we are cathing in a variable and using that we can call the other methods of login page, same for all other below just go through u will understand.
     await loginPage.goTo();
     await loginPage.validLogin(testdataset.username,testdataset.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(testdataset.productname);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testdataset.productname);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

 });


 

