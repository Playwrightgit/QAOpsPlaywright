
//here we will see how to write code in constructor using typescript rules-
import { expect, type Locator, type Page } from '@playwright/test';
const {test, expect} = require('@playwright/test');
class CartPage
{

    //inside the constructor we directly wrote this.page=page value but page data type we are not sure also for ex- this.cart=locator value
    //here also we are not sure about the locator datatype , so you can check in playwright document whats the datatype for page and locator
    //even if u r not sure use data type as any.

    //below we are initializing page and locator datatype and that we can use inside the constructor
    //so for variables inside the class we dont have to use let, const or var keyword

    //now iam going to add the typescript files directly on project and we will see the difference , this file is incomplete and let it be as this is just for demo
    page:Page;
    cartProducts:Locator;
//also we need to import the details from playwright test so that playwright will understand what is page, locator, see line 3 above.

constructor(page:any)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}

async VerifyProductIsDisplayed(productName)
{
   
    await this.cartProducts.waitFor();
    const bool =await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();

}

async Checkout()
{
    await this.checkout.click();
}

 getProductLocator(productName)//this locator is dynamic hence first we are writing a method
 //to create the dynamic locator and then creating a function separately verifyproductisdisplayed where we use this locator
{
    return  this.page.locator("h3:has-text('"+productName+"')"); 
}

}
module.exports = {CartPage};