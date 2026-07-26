import {test, expect,Locator,Page} from '@playwright/test';
//unlike javascript we dont store package details on variable , in typescript we directly import package details using from keyword.

export class LoginPage {  //unlike javascript we dont use module.exports we just write export keyword before the class in typescript.
    signInbutton : Locator;
    userName :Locator;
    password : Locator;
    page : Page;

constructor(page:Page)
{
    this.page = page;
    this.signInbutton= page.locator("[value='Login']");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");

}

async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client");
}

async validLogin(username:string,password:string)
{
    await  this.userName.fill(username);
     await this.password.fill(password);
     await this.signInbutton.click();
     await this.page.waitForLoadState('networkidle');

}

}
module.exports = {LoginPage};