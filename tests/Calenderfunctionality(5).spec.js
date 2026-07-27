const {test,expect}=require("@playwright/test");

test("Calender functionality",async({page})=>

{
//first we will define 3 variables -

const month="6";
const day="15";
const year="2027";
//we will define an array with the above 3 variables for our further assertions.

const expectedlist=[month,day,year];

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
//first click on the calender input box-
await page.locator(".react-date-picker__inputGroup").click();
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
//we have performed the bove operation twice as we need to reach till year selection.
await page.getByText(year).click();
//now we have to select month-
await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
//so we have month defined on variable as 6 but on calender its June in word
//hence we have grabbed all the month names and then used nth() function , inside
//nth function we have converted "6" to number as it was string and then minus 1 because our above code extracted all the 
//month count in array and in array index starts from 0.
await page.locator("//abbr[text()='"+day+"']").click();//LEARN THIS XPATH

//now we have to verify if the correct date is selected or not
//so we have to find the common tags where this month , date and year values are stored on html and store those in array 
// and then we will
//write a for loop for the same and match it with against our defined array expectedlist.

const inputs=page.locator(".react-date-picker__inputGroup__input");//this will return an array 
//with 3 values(month , day and year numeric values) which we are storing in inputs

for(let i=0;i<expectedlist.length;++i)//length is not a function, its a property
{
    const value=await inputs.nth(i).inputValue();
    expect(value).toEqual(expectedlist[i]);

    //so above what will happen is loop will run 3 times and first time it will check value of 6 with our defined array 0th index value
    //similarly it will check for the other 2
    //like this-
    //expectedlist[month,day,year]=inputs[6,15,2027]
}



//now we will see some interesting tools playwright provides
//npx playwright test --debug, use this debug flag to open codegen playwright inspector which is used to execute the 
//scripts one by one and also to get the locator details like how we do in CSS selectors hub
//next is npx playwright codegen URL- so we write codegen and next to it we will write the URL so that it will open the codegen
//record and play tool it will record and write the codes- try it out yourself




//testgit


});