const {test,expect} = require("@playwright/test");


//here we will see how to inject cookies on browsers new context, because earlier we saw how to 
//make the API call and getting the json then extracting token from the response json and setting the token on
//local storage, but what if there are more than one key value pair and multiple things are there we cannot set each thing one 
//by one hence we are extracting the complete response and injecting as cookies to the browsers new context
//this way we dont have to worry , also this we will see for login session only
//and once we do this then we all the tests on that file will share the same session details and execute the test cases.
let webcontext;// we are defining one variable which will store the browser context injected with cookies.

test.beforeAll(async ({browser})=>
{
    const context=await browser.newContext();
   //so first we are creating a new context and will login once then we will extractthe complete json and 
   //open a new context there we will inject the cookies.
    const page= await context.newPage();
    const email="jeetcc@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Test@1234");
    await page.locator("#login").click();
    await page.locator(".card-body b").first().waitFor();
    await context.storageState({path: 'state.json'}); //here we are extracting the json from the context using storagestate method
    //above code will create a state.json file with all the details.
    webcontext = await browser.newContext({storageState:'state.json'});
    //above we are opening a new context and then injecting the json which we extracted from the previous context
    


}

);

test('End to End Automation Example with browser inject', async ()=>  //notice here we have removed the page fixture as we are creating the new page dynamically
 {
    
    const page= await webcontext.newPage();
    const email="jeetcc@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    const allproducts= await page.locator(".card-body");//here we are storing all the cards, this wil return an array
    await page.locator(".card-body b").first().waitFor();
    const productname='ZARA COAT 3';
    const count= await allproducts.count();//here we are getting the count 
    //now we have to run a for loop to select the zara coat 3 product

    for(let i=0; i<count; ++i)
    {
       if(await allproducts.nth(i).locator("b").textContent()===productname)//notice when we write page.locator then the locators
       //scope becomes the entire html, but here we wrote allproducts.nth(i).locator that means we are already on the card body
       //and inside that card body locators scope is there to search the next element.
       {
        await allproducts.nth(i).locator("text= Add To Cart").click();//notice this locator this is search using text present on UI
        break;//to come out of for loop
       }
     
    }

    //now we have to navigate to cart and verify the added product is present or not

        await page.locator("[routerlink*='cart']").click();
        //now we need to wait once all the cart items are loaded and then we will check our added product
        await page.locator("div li").first().waitFor();//we are using this line as isvisible function on playwright doesnt have auto wait.
        const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
        //notice the above locator, here we are using locator provided by playwright, what we are doing here is we are searching 
        //a text inside a particulat tag, we know added products have h3 tag hence inside that we are searching our products name.
        //this will save us from iterating one by one.
        expect(bool).toBeTruthy();
        //now we have to navigate to checkout page and search for country india on sutosuggestive dropdown.
        await page.locator("li[class='totalRow'] button[type='button']").click();//LEARN THIS CSS LOCATOR
        await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:150});
        //above we are using presssequentially to add i,n,d one by one with delay of 150 miliseconds otherwise fill will directly paste ind and we will not get autosuggestive options.
        const dropdowns= await page.locator(".ta-results");
        await dropdowns.waitFor();
        const optionscount=await dropdowns.locator("button").count();
        for(let i=0; i<optionscount; ++i)
        {
            if(await dropdowns.locator("button").nth(i).textContent()===" India")
            {
                await dropdowns.locator("button").nth(i).click();
                break;
            }
        }
        //await page.pause();

        //now we will verify the username on checkout page and then we will click place order and then verify the order confirmation and its details and 
        //then we will copy the order id and then on order summary page we will verify the order with order number

         expect(page.locator(".user__name [type='text']").first()).toHaveText(email);//tohavetext function is to check presence of text on the locator
         await page.locator(".action__submit").click();
         await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
         const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
         console.log(orderId);
 
         await page.locator("button[routerlink*='myorders']").click();
         await page.locator("tbody").waitFor();
         const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) 
    {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();//includes function is used to verify if the sub-string present on main string
 //also includes returns boolean value.
});