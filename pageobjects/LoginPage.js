//so to follow the page object pattern we need to create separate json files to store the locators and methods
//which performs the actual function
//locators we are storing in constructor



class LoginPage {

constructor(page)
{
    this.page = page; //this. we have to mention on when initialising 
    //variables inside the constructor so that the variable is recognised in all over the class
    this.signInbutton= page.locator("[value='Login']");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");

}

async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client");
}

async validLogin(username,password)
{
    await  this.userName.type(username);
     await this.password.type(password);
     await this.signInbutton.click();
     await this.page.waitForLoadState('networkidle');

}

}
module.exports = {LoginPage}; //we need to export the class so that it can be used in our actual test