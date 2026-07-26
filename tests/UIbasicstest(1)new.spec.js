const {test,expect}=require('@playwright/test');
//importing test files from playwright node_modules containing all the jar files
//here we are importing the packages

//outer structure
//test('Playwright first test case',async ()=>//test we imported from playwright,
// its an annotation, its a test function to declare tests, similarly we have expect function to write assertions
//{
//playwright code here
//});

// java script is asynchronous meaning it will try to execute all code at once instead of one by one hence we have to mention async 
//before every function and inside we have to put await keyword before every line

//below we will see how to invoke browser and what things require for the same
test('Playwright first test case',async ({browser})=>//browser is nothing but fixture meaning global variable , we got it when we imported the package
//we keep it under {} to recognize its a playwright global fixture
{
    const context = await browser.newContext();//this we are using to open a fresh browser instance,and also to inject cookies like the login page details so once instance launches then login step we can skip
    const page = await context.newPage();// this step is to open a new page on the new instance
    await page.goto("https://www.google.com");
});

test('Playwright second test case',async ({page})=>//page is again one fixture, this we use in case we directly launch browser and no need to inject any cookies
{
    await page.goto("https://www.youtube.com");
    console.log(await page.title());//this is to print anything on console
    await expect(page).toHaveTitle('YouTube');//assertiion to check title, this i got from "https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-title"
});

//to set the configs like which browser and all we do that on playwright.config.js


//npx playwright test --headed   for head mode
//if we write test.only then only that test function will run entirely.

//playwright supports css and xpath for locators but mainly it supports css, add css selectors hub extension for chrome or
//you can add chropath extension as well, it works same
//basic css locator syntax-
//for id tagname#id or #id
//for class name tagname.classname or .classname
//for any other attribute [attributename='value'] or [attributename*='value'] this is for regular expression so that we can give subpart of value.

test('Playwright third test case',async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("input#username").fill("rahulshetty");//fill function is used to input some values
    await page.locator("#password").fill("Learning@830$3mK2");
    await page.locator("[name='signin']").click();
    //we have give the username wrong and we need to verify the error message
    //for that we will use regular expression on the locator as the error message disappears after few seconds and because of that the locator attribute value is updating.
    await page.locator("[style*='block']").textContent();//here we got the content and now below we will verify
    //for that take assertion from the playwright documents
    //console.log(await page.locator("[style*='block']").textContent());//for console give await inside this is because inside only elements are searching, whereeber action is performing playwright before that only we have to give await
    //await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    //we can write the above two lines as below also
    
    expect(await page.locator("[style*='block']")).toContainText("Incorrect");//for expect we can write ouside or inside anywhere await.
    console.log(await page.locator("[style*='block']").textContent());
});


//now we will give correct username and password, below we will login and get the first card name
test('Playwright fourth test case',async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("input#username").fill("rahulshettyacademy");
    //await page.locator("input#username").fill("");//this is to clear the input values on username field
    await page.locator("#password").fill("Learning@830$3mK2");
    await page.locator("[name='signin']").click();
    //console.log(await page.locator(".card-body a").first().testContent());//here in this locator we are traversing from parent to child, first uis parent classname then a is child tag.
    //also here we are printing the first card title , as we found 4 card titles we are printing the first.
    //const cardtitle=await page.locator(".card-body a");
    //console.log((cardtitle).last().textContent());
    //console.log(await page.locator(".card-body a").nth(1).textContent());//this will also print first card title
    //console.log(await page.locator(".card-body a").nth(0).textContent());//this will print card title at 0th index
    //console.log(await page.locator(".card-body a").first().textContent());

//now we have to print only iphone x which is first card title , for that we will store all card titles on one array
//and then we will print all card titles
await page.locator(".card-body a").last().waitFor();
await page.waitForLoadState('networkidle');
const allcardtitles = await page.locator(".card-body a").allTextContents();//storing all card titles on array
console.log(allcardtitles);
    //above line 75 to 79 is commented because of that 86 line will print blank array this is because in playwright 
    //auto wait is not applicable for allTextContents() function.
    //hence what we will do is we have to wait till the network is idle which means all this applications work on service call model
    //which means API services run and then render the output on frontend, hence we will wait till all the services call are done
    //and the network is idle then we will write the all text contents code
    //sometimes this networkidle code will not work so instead u can use line 83, so we can se first or last and wait till its loaded that means those details are loaded and next code will work.

});


test('UI controls',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username=page.locator("input#username");
    const password=page.locator("#password");
    //now we will select dropdown value and select user radio button and verify if the radio button is selected or not
    //also we will check the terms checkbox and uncheck and also verify checked and unchecked.
    const dropdown= page.locator("select.form-control");
    await dropdown.selectOption("Consultant");//select function is used for select dropdowns where values are predefined, we just pass the value and selection will be done
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    //await page.pause();//this will not immediately close the window instead it will pause, and also it will open the debugger
    console.log(await page.locator(".radiotextsty").last().isChecked());//this will return boolen value, cannot use for assertion just for returning boolean value true or false.
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    //note-we write await sometimes inside and outside because we have to write await only before some function is done, so use logic and put await
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").click();
    //now we have to check if the checkbox is unchecked
    expect(await page.locator("#terms").isChecked()).toBeFalsy();//notice here we wrote await inside due to ischecked function
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText");
    //above line we wrote to check some attribute value pair for some locator.
});


//below we will see how to handle multiple pages on one browser instance-
test('Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(//Promise.all we use when we want to execute multiple lines similtaneously(asynchroushly)
        //also this will catch the resut in a array, here we are catching a new page
        //also we are writing wait for event first and then clicking the link because wait for even is used to listening mode and post that 
        //if new event occured it will be ready to catch that.
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),//new page is opened
   
   ]);
   
 //below we have to verify a sub-string from a new page-
    const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");//@ is the delimiter from where splitting will happen. and split things are stored in array
    const domain =  arrayText[1].split(" ")[0]//here space is the delimiter, and we are using [0] as the index from the splitted arraytext[1].
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());//inputvalue function we have used instead of textcontents because
    //testcontents will work only when the page is initially loaded and attached to DOM, and domain value we are passing at runtime.
 
 });



 