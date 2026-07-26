//here we will see how to modify the API request , so the scenario is security testing like if we click on view order
//of any order then on the url order id is attached , so if some hacker updates the order id then we should get
//unauthorised order kind of message.

const { test, expect, request } = require("@playwright/test");


test("API request intercept security testing", async ({ page }) => 
{

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("jeetcc@gmail.com");
    await page.locator("#userPassword").fill("Test@1234");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'})
    );

    //above once we write page.route then inside we give the URL and then function with variable route, now to modify the request, we need to use
    //route.countinue instead of route.fulfill and inside we pass our URL with updated ID, we can modify header, body anything

    //below we will check if we ge the message 
    //note we are writing the above code before clicking the view order button because above code will be in listening mode.
    await page.pause();
    await page.locator("button:has-text('View')").first().click();
    //await page.pause();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");





});