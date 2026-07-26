

const {test,expect,request}= require("@playwright/test");
const { APIutils } = require("../Utils/APIutils");

const loginpayload={userEmail: "jeetcc@gmail.com", userPassword: "Test@1234"};
const orderpayload={orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};



let response;

test.beforeAll(async()=>   {

    const apicontext= await request.newContext();  //its recommented to keep the new context code in the actual test program which will execute.
    const apiutils = new APIutils(apicontext,loginpayload); //creating a new object of APIutils class and this will run the constructor of the class.
    response = await apiutils.createorder(orderpayload); //this will run the create order method on APIutils class and the response will be stored in this codes response variable.

});




test('End to End Automation Example API testing refactor', async ({page})=>
 {

    

    await page.addInitScript(async value=> {   

              await window.localStorage.setItem('token',value); 
    },response.token);
    
    const email="jeetcc@gmail.com";
    
    await page.goto("https://rahulshettyacademy.com/client/");
    
    const productname='ZARA COAT 3';
    
    

   
 
         await page.locator("button[routerlink*='myorders']").click();
         await page.locator("tbody").waitFor();
         const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) 
    {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderid.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   await page.pause();
   expect(response.orderid.includes(orderIdDetails)).toBeTruthy();
});



