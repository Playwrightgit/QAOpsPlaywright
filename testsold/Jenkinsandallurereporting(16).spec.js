//so for reporting we can use allure reporting , so first we need to install allure plugin
//using the command- npm install -D allure-playwright 
//now to generate the allure report we need to use the below commands
//add flag --reporter=line,allure-playwright
//so we need to generate line report first which is basic text recport that allure will use for reporting
//above command will create allure-results now use below commands
//allure generate ./allure-results to generate report this will create allure-reports folder
//to open report allure open ./allure-report


//to create custom scripts add the scripts in package.json file , go there u will understand
//now to run use command npm run <Scriptname>
//NOTE-Jenkins is a free, open-source automation server used by developers and DevOps teams to build, test, and deploy software. It acts as a central hub for Continuous Integration and Continuous Delivery (CI/CD), automating the repetitive manual tasks required to get code from a repository into production.
//first download and install jenkins through web
//i have created one jenkins account with below creds
//JEET1234
//Jenkins