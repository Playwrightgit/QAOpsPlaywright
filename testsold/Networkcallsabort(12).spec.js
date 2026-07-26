const{test,expect,request} = require ("@playwright/test");


//here we will see how to abort network calls which means suppose we need to check if the server is down scenario , so 
//what we will do is we will block the loading of the images on page


test("abort network calls", async ({page})=>
{
    await page.route("**/*.{jpg,jpeg,png}", route=>route.abort());
    //on the above code we are mentioning that for any url ending with the mentioned extension abort the network calls, so the image will not load in the above scenario.
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("input#username").fill("rahulshettyacademy");//fill function is used to input some values
    await page.locator("#password").fill("Learning@830$3mK2");
    await page.locator("[name='signin']").click();
    //await page.pause();
    await page.on('request',request=>console.log(request.url()));
    await page.on('response',response=>console.log(response.url(),response.status()));
    //above two lines of code is to get all the request and response URL network calls made during this test execution
    //with the status on the application tested.
    //await page.locator(".card-body a").last().waitFor();
    //await page.waitForLoadState('networkidle');
    const allcardtitles = await page.locator(".card-body a").allTextContents();





});