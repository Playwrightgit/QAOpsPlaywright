
//this below code read carefully as its very much different from javascript
//here we are inporting test from playwright/test as basetest then we are extending basetests feature to have a custom fixture

import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {//this particular code is suggested by playwright itself, if we dont want to use this then we can just mention
    // testDataforOrder : {username:String,password:String,productname:String} on line 12 which is basically we are declaring the datatype for testdatafororder.
    username: string;
    password: string;
    productName: string;
};
export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(  //here we mentioned basetest.extend but on 
    //JS file we mentioned base.test.extend because in JS file we are catching the package details in base and then in base we have test class which we are extending, but here if u see the import line there we are directly importing test class as base.
{
testDataForOrder :    {
    username : "anshikaw@gmail.com",
    password : "Learning@830$3mK3",
    productName:"ADIDAS ORIGINAL"
    
    }

}

)




