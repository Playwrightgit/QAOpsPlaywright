const {test,expect}=require("@playwright/test");

//in this program we will see more validations

test("More Validations", async ({page})=>
{

await page.goto("http://www.google.com");
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await page.goBack();//to go back on browser
await page.goForward();//to go forward on browser
//now we will check to verify if the element is hidden or visible-
await expect(page.locator("#displayed-text")).toBeVisible();//to check if the element is visible or not.
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();//to check if the element is hidden or not.

//next we will see how to handle java based popups-
page.on('dialog',dialog=>dialog.accept());//here what is happening is we can write this code anywhere in program,
//what it will do is- on function accepts two arguments one is the event and the other one is what should happen once event occurs
//so currently its in listening mode and it will check if dialog event occurs and if yes then it will accept
await page.locator("#confirmbtn").click();//on this code java popup will open but we dont have to worry because the above code will take care.
await page.locator("#mousehover").hover();//this is to hover over any element.
await page.pause();

//now below we will see how to handle iframes, so iframes are rendered on top of the current browser page
//to identify if any element is under iframes or not so that element will have tag iframes or frameset.

//we have special locator function which is .framelocator, so basically whis will return page object which we have to catch in a variable
const framespage= page.frameLocator("#courses-iframe");//here notice we are not writing await because we are just capturing the locator and no action is performed.
//now we can search any element inside the iframe using framespage.
await framespage.locator("li a[href*='lifetime-access']:visible").click();//:visible is used if we have 2 elements matching and one is hidden and we need to select the visible one
const textcheck= await framespage.locator(".text h2").textContent();
console.log(textcheck.split(" ")[1]);//here we are splitting using space as delimiter and once splits it will be stored in array and then 
//we are printing the 1st array index value.



});