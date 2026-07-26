const {test,expect}=require('@playwright/test');
//below we will see some special playwright locators so we can use those instead of CSS whereever applicable.
test('Special palywright test', async({page})=>
{

        await page.goto("https://rahulshettyacademy.com/angularpractice/");
        //getbylabel- this we will use to get the element by its label, specially used for checkbox,radiobutton
        //cannot be always used for text input boxes as it will work only with elements having label tag
        //and for text input sometimes the textbox and its label are not associated to each other.

        await page.getByLabel("Check me out if you Love IceCreams!").click();//for checkbox and radio button we can use click or check function.
        await page.getByLabel("Employed").check();
        await page.getByLabel("Gender").selectOption("Male");//selectoption will work only with select tag dropdowns.
        //getbyplaceholder- if any element having placeholder attribute we can use that for fincing the element
        await page.getByPlaceholder("Password").fill("abc123");
        //getbyrole- irrespective of tage,this we can use for multiple things like button, links etc , these are roles, and with role we can give names to find the specific one
        //just see the example below -
        await page.getByRole("button",{name:'Submit'}).click();
        //above we selected role as button now inthe second argument we mentioned the name of the button as there can be multiple buttons.
        //getbytext- this we will use to identify the element by its text like in success message, irrespective of tags
        //note:for getby role button either tag or class name should have button.
        await page.getByText(" The Form has been submitted successfully!.").isVisible();
        await page.getByRole("link",{name:'Shop'}).click();
        //above code we have written to click on the shop link at the top of the page, check in application.
        //now below we will write the code for selecting a particular product and add to cart, previously we have seen this example by using for loop
        //but now we will use fulter on the locators using the above special playwright locators.
        await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();
        //note - above we have first selected the all the cards using the locator(inside the locator we passed just tagname) then we used filter to get the Nokia edge so that
        //control will come to the right card, hasText works the same way as getbytext, and then we used getbyrole to click on the button
        //notice on the above code getbyrole we didnt mention the second argument of name as there is only one button on the card.

        //if we want to open the playwright runner we can do that by passing npx playwright test --ui on the console.



//now we will rewrite the clientapp code using the special locators whereever possible.

});
