// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */

//below we are storing all the config key value pairs on config variable
const config = ({
  testDir: './tests',
  //this indicates test folder where we have js files to execute , it will run all the files, if we want specific then we have to mention the name post .tests/
  testMatch:'**/*.spec.js',//this we wrote so that playwright will exxecute all the files on tests folder having .spec.js extension.
  timeout: 40*1000,// this is global wait for every steps
  expect ://this is specifically for assertions
  {
    timeout : 5000,
  },

  reporter : 'html',//for reporting purpose

  
  use:
 {
browserName : 'chromium',
headless: false,
screenshot: 'on',
trace: 'retain-on-failure'//we can use on or off also, on will keep the trace for all the steps fail or pass, off is self explanatory
//and retain-on-faulure is only for fail test cases.
 },
});

module.exports = config//we are exporting config so that its available for all the files

