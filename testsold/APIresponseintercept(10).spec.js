//Here we will see how to modify the API response call , so the scenario is if we need to verify that in orders page
//no orders are there and we are seeing the message on page that there are no orders, so this we will see only when there
//are no orders , so we cant just delete all orders and do our testing so for that we will modify the API response when we are 
//clicking on the orders page so we will fake the API response and give it to browser so browser will think there are no orders in the 
//response and will render the frontend accordingly, so for this we need to get the API response first then modify and send to browser again .

const {test,expect,request}= require("@playwright/test");
const { APIutils } = require("../Utils/APIutils");

const loginpayload={userEmail: "jeetcc@gmail.com", userPassword: "Test@1234"};
const orderpayload={orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

const fakepayload={data:[],message:"No Orders"};
//above fakepayload u will get by logging into account having no orders so before clicking the orders tab , open inspector>network and then click on
//orders then u will see the request, response everything.

let response;

test.beforeAll(async()=>   {

    const apicontext= await request.newContext();  //its recommented to keep the new context code in the actual test program which will execute.
    const apiutils = new APIutils(apicontext,loginpayload); //creating a new object of APIutils class and this will run the constructor of the class.
    response = await apiutils.createorder(orderpayload); //this will run the create order method on APIutils class and the response will be stored in this codes response variable.

});




test('End to End Automation Example API testing intercepting API response', async ({page})=>
 {

    

    await page.addInitScript(async value=> {   

              await window.localStorage.setItem('token',value); 
    },response.token);
    
    const email="jeetcc@gmail.com";
    
    await page.goto("https://rahulshettyacademy.com/client/");

    //we will write our API response intercepting code here

    //this is the flow-
    //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    
    //NOTE- To intercept simply means to catch, stop, or access something while it is traveling from one point to another

    //below we are writing page.route(), so route method is used for routing which means we will be modifying the response
    //it will take two arguments one is the request URL and the other one is the function with route variable(this variable will have the API response actual one which we will modiy and fake it).
    //then we will store the API response on a variable , to store response we wrote page.request ,  here we are opening API mode in page
    //then .fetch to get the response then inside fetch method route.request(), is the route variable, second argument of route function 
    // which will have all the response and we will get that response from request function.
    //now to modify the response we will use route which contains the actual response then . fulfill method here we wil pass the response variable where we stored the actual response,
    //and then the body variable , our body and this body will replace the actual responses body, do remember since fakepayload we stored as java script object
    //we need to change that to json, so we did that when declaring body variable.
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>
        {
            const response=await page.request.fetch(route.request());
            let body=JSON.stringify(fakepayload);
            route.fulfill(
                {
                    response,
                    body,
                }
            );
        }
    );
 
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");//here on the URL see we have given * at the end , originally there was some token to uniquely identify the customer but since we want to make our code not hardcoded hence we used * for reqular expression.
    //above code we wrote to wait till the response is generated actual one then we will fake and then we can verify the fake rendered frontend
    //also note routing code we have to write before the order tab click i.e before the step where we need to modify the API response and send to browser.
    console.log(await page.locator(".mt-4").textContent());
   
});



