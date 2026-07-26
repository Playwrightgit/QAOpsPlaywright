// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */

//NOTE:In addition to configuring the test runner you can also configure Emulation, Network and Recording for the Browser or BrowserContext. These options are passed to the use: {} object in the Playwright config.


//below we are storing all the config key value pairs on config variable
const config = ({
  testDir: './tests',//this indicates test folder where we have js files to execute , it will run all the files, if we want specific then we have to mention the name post .tests/
  retries:2,//so if we have some tests fail this config will run the failed tests two more times before it mark them as failed
  //also should be defined at global level
  worker:1,//so worker is test execution process/environments, so by default playwright will run 5 worker at onve
  //which means 5 browser will open and run tests parallely
  //note that 5 test file will open parallely and inside individual tests will run on series.
  timeout: 40*1000,// this is global wait for every steps
  expect ://this is specifically for assertions
  {
    timeout : 5000,
  },


  projects : [  //project is an array with multiple configs
{
name: "chromewithhead",
use:
 {
browserName : 'chromium',
headless: false,
screenshot: 'on',
trace: 'retain-on-failure',//we can use on or off also, on will keep the trace for all the steps fail or pass, off is self explanatory
//and retain-on-faulure is only for fail test cases.
viewport:{width:720,height:720},//this is to set our width and height for the browser
ignoreHttpsErrors:true, //this is used when there is no SSl certificate and browser gave error , to bypass that we use this config
 permissions:['geolocation'],//this is used if we get any option like allow location when opening the browser, so this config will handle that and allow the location.
video:'retain-on-failure'//on,off same like ss and trace.
}
},
{
name:"chromewithouthead",
use:
 {
browserName : 'chromium',
headless: true,
screenshot: 'on',//off,retain-on-failure
trace: 'retain-on-failure',//we can use on or off also, on will keep the trace for all the steps fail or pass, off is self explanatory
//and retain-on-faulure is only for fail test cases.
...devices['iPhone 14']//this is used to test in mobile mode, browser will open in device configuration which is selected, like iphone or samsung etc.

 },





}



//to open trace navigate to trace.playwright.dev and upload trace file








  ],
  reporter : 'html',//for reporting purpose

  
  
});

module.exports = config//we are exporting config so that its available for all the files

//now we can create multiple config files in case we need to run different configs for different tests 
//also we can create multiple browser configs in one config file and select to run the same , in this file 
//we have created multiple browser configs in one file.
//on terminal use the below flag extra to run the same.
//--config playwright.config.js --project=chromewithouthead
// if our test fail due to some error we can run the test in ui runner and once error is displayed we will get copy
//prompt option which we can copy and paste in some LLM model like chatgpt and get the resolution.

