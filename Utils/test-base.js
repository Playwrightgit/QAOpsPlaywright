const base= require('@playwright/test');

//so below we are extending the tests feature by adding a data set and then exporting this  
// lets call it customtest which is having the extended feature which holds the testdataset which is a custom fixture.
exports.customtest = base.test.extend(  //extend is a function.
{

testdataset : 
{

 username:"jeetcc@gmail.com",
 password:"Test@1234",
 productname:"ZARA COAT 3"
}})