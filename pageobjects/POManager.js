const {LoginPage} = require('./LoginPage'); //./ if on same folder otherwise ../ if on separate folder.
const {DashboardPage} = require('./DashboardPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');
const {CartPage} = require('./CartPage');

//above lines of code is require to identify from where we are importing , this is required when we are creating objects of the 
//respective classes



class POManager
{
constructor(page)//notice here we are creating the new objects inside this class, so what happens is 
//when only this class object is created on main test then all the objects will be created for different page classes
//otherwise we had to create objects separately in our main test.
{
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.cartPage = new CartPage(this.page);


}
//below functions return the objects created
getLoginPage()
{
    return this.loginPage;
}

getCartPage()
{
    return this.cartPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}
getOrdersHistoryPage()
{
    return this.ordersHistoryPage;
}

getOrdersReviewPage()
{
    return this.ordersReviewPage;
}
}
module.exports = {POManager};