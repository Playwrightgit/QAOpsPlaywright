//here we will learn how to do API testing using Playwright
//so nowadays almost every application makes API calls to the API server with some request and 
//once we get the response then developer will show that to front end

//our first scenario is we have to skip the login by injecting session token
//so when we login to application then API calls are made to API server and in return we get the session token that is stored in web 
//browser and hence the login page is rendered.
//to check just for knowledge inspect while logging in and then go to network there you can see API calls are made and what is the request,
//payload,response and everything and where the response i.e the session token is stored, so for login the session token is 
//stored under local storage as a key value pair, it can be stored in multiple ways as well, like as cookies or under session storage
//etc, just check that under inspect>Application tab.

const {test,expect,request}= require("@playwright/test");
//first to make the API request , import request library from the playwright
//then first declare a variable and store the payload which is API request
const loginpayload={userEmail: "jeetcc@gmail.com", userPassword: "Test@1234"};
const orderpayload={orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
// its a property value pair and in javascript we 
//dont need single quotes for property.

let tokenretrieved; //let allows you to reassign a variable's value, while const creates a read-only reference that cannot be reassigned.
let orderid;
//now we have to write our API request code and it should run before all the tests below

test.beforeAll(async()=>   //beforeall is like .only annotation //Annotations in Playwright are metadata markers attached to tests to modify their execution behavior or provide additional context in test reports
        //this will run before starts running any test, // we are writing the API call function inside before all function as the argment.
{

    const apicontext= await request.newContext();
    const loginresponse=await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginpayload
        });

        expect(loginresponse.ok()).toBeTruthy();
        const loginresponsejson= await loginresponse.json();
        tokenretrieved =  loginresponsejson.token;//here await is not required as we are just parsing the json , meaning getting something from json and in this case its token.
        console.log(tokenretrieved);


//above what we are doing is like how we open a new context in browser using browser.newcontext(), similarly we are doing for API 
//so request.newcontext(), will open a new request.
//next we are doing a post operation, post function will take multiple arguments , just hover over post and u will see the details and 
//the syntax , so we are passing the request URL and payload
//next we are checking if the request response is ok or not , in API 200ok means request is successfull, so we used ok function which will return boolean 
//and we are checking that using tobetruthy method to make sure ok function returns true value
//next we are extracting the json (API response will be in json format) from the response
//and from the json we need only token so .token.

//now we have to write another API call to place the order -
const orderresponse=await apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",

    {

        data: orderpayload,
        headers:{        //we have to provide here headers which is nothing but the authorization token which tells us that place order is for the above session/user.

            //headers we will be getting from the headers tab , inspect>headers tab, also we need to mention the content type

            'Authorization':tokenretrieved,
            'Content-Type':'application/json'
        },
    })

        const orderresponsejson= await orderresponse.json();
        //now we need to extract the order ID from the json response, so put the response json from the inspect and put in json formatter
        //from there we just need to extract the order id
        orderid= orderresponsejson.orders[0];   //if you see the json on json editor u will see order id is in orders[0] index.




});

//test.beforeEach();//this runs before each tests


test('End to End Automation Example API testing', async ({page})=>
 {

    //now to insert that session token on browser local storage we have to run a javascript, to run a javascript
    //in playwright we have a function called addinitscript, this takes two arguments, one is the script function and the other one is the parameter

    await page.addInitScript(async value=>     // value => means a function which takes value as the argument for the function.
        {

              await window.localStorage.setItem('token',value);  //here we are setting the token=tokenretrieved on browser local storage,value is tokenretrieved
    },tokenretrieved);
    //await page.pause();
    const email="jeetcc@gmail.com";
    
    await page.goto("https://rahulshettyacademy.com/client/");
    //await page.locator("#userEmail").fill(email);
    //await page.locator("#userPassword").fill("Test@1234");
    //await page.locator("#login").click();
    // const allproducts= await page.locator(".card-body");
    // await page.locator(".card-body b").first().waitFor();
    const productname='ZARA COAT 3';
    // const count= await allproducts.count(); 
    

    // for(let i=0; i<count; ++i)
    // {
    //    if(await allproducts.nth(i).locator("b").textContent()===productname)
    //    {
    //     await allproducts.nth(i).locator("text= Add To Cart").click();
    //     break;
    //    }
     
    // }

    

        // await page.locator("[routerlink*='cart']").click();
        
        // await page.locator("div li").first().waitFor();
        // const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
        
        // expect(bool).toBeTruthy();
        
        // await page.locator("li[class='totalRow'] button[type='button']").click();
        // await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:150});
       
        // const dropdowns= await page.locator(".ta-results");
        // await dropdowns.waitFor();
        // const optionscount=await dropdowns.locator("button").count();
        // for(let i=0; i<optionscount; ++i)
        // {
        //     if(await dropdowns.locator("button").nth(i).textContent()===" India")
        //     {
        //         await dropdowns.locator("button").nth(i).click();
        //         break;
        //     }
        // }
        // //await page.pause();

        

        //  expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
        //  await page.locator(".action__submit").click();
        //  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        //  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        //  console.log(orderId);
 
         await page.locator("button[routerlink*='myorders']").click();
         await page.locator("tbody").waitFor();
         const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) 
    {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderid.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   await page.pause();
   expect(orderid.includes(orderIdDetails)).toBeTruthy();
});

//now we will refactor the code i.e refactor API calls from the utils folder.

//Note-if we have api and ui testing code then on execution command if we use  --debug flag then debugging 
//will start and happen only for the UI code not for the API code , so for API code debug we will use visual studio only.
//put the execution command by creating parameter test under debug>scripts. and then shift+ctrl+P
//and then select debug npm script then it will ask to enter the command on terminal as well then run it by putting trace that little red dot.

//if we want more detail then on config just keep the trace as on and from the trace file we will get the API code details
//like request, response etc etc.