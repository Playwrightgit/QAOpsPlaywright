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
//follow this account to see the configs


//Now we will see difference between typescript and javascript
//typescript is nothing but superset og javascript
//typescript=javascript + Additional feature
//typescript is static/strong typing which means unlike javascript where we dont have to mention any datatype while
//declaring variable , in typescript we need to manually mention data type while declaring or initializing variable
//code written in typescript is maintainable, readable , better code quality,
//for typecript we have to create .ts file and then we first have to convert it into .js file and then we have to run it
//because node which is the runtime environment can execute only .js file
//to convert we can use command npx tsc <filelocation/typescript filename>
//Note - if we dont use the additional feature which is nothing but strong typing using data types n all in ts file and 
//if we try to convert that into .js file then it will not block but just will give warnings
//we will see side by side comparision how typescript and javascript code difference.
//before writing typescript code in .ts file we need to install typescript module first
//using the below command npm install --save --dev typecsript