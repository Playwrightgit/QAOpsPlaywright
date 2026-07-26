const {test,expect} = require("@playwright/test");



test("Screenshot and visual testing", async ({page})=>
{


await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator("#displayed-text")).toBeVisible();
await page.screenshot({path: 'screenshotpagelevel.png'});//this takes screenshot at page level
await page.locator("#displayed-text").screenshot({path: 'screenshotelementlevel.png'});//this takes screenshot at element level
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();



});


test("screenshot comparison", async ({page})=>
{

    await page.goto("https://www.facebook.com/");
    expect(await page.screenshot()).toMatchSnapshot('landingpage.png');

    //so what we are doing above is we landed on website and taking screenshot and comparing the screenshot with landing.png file
    //but when we run this for the first time then we dont have landing.png file so it will create and hence test will fail
    //but from the second time it will work properly.
    //so the code will create landing.png under tests/Screenshotsandvisualtesting(13).spec.js-snapshots will create
    //and comparison ss will be created under test-results 

});