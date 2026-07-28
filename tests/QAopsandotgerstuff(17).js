//so now we will see about QA ops, so basically just like devops we have QA ops concept, just see the ss QA ops details u will understand
//next we have another ss QA ops flowchart which will show what steps what we will implement 
//so basically we will pull the code from github and merge our piece of code , push our code in github thats called an event , so once this event is trigerred then 
//pipeline will run which is basically install the dependencies and prepare everything for execution then
//it will start the execution and handover to microsoft azure workspace , where code will run and it will generate report
//and the result will be sent to git and it will decide based on result whether to merge changes or not.

//first we will see how to run our tests from playwright which will run on Azure workspace
//create a microfoct azure account- trial account
//for that navigate to type microsoft azure on google go to their website and create a trial account
//iam using my microsoft account jeetcc@gmail.com , Lenovo@4321
//Once azure account is created click on create resource
//search for playwirght workspaces
//click on create
//give a workspace name under instances this is your playwright project
//Resource group give some name i have given JEET
//so this resource group is parent for workspaces, multiple workspaces will be there on resource group
//so any policies, permission we give on resource group those will be used for all the instances
//i have given JEET as resource group and PlaywtightJeet as workspace name.
//storage account is pwstrgjeet5abd, this is where our reports n all will be stored 
//now do next next and create
//now it will show deployment complete and then go to your resource and click on get started
//u will see series of steps 
//lets do one by one
//first we need to install the playwright service package so that we can connect playwright with Azure
//run this npm init @azure/playwright@latest
//once package is installed then playwright.service.config.js file will be created this we will use for running our tests on 
//azure workspace, this will have all the details from our playwright.config.js, make sure u enable the reporting code
//on playwright.service.config.js
//now next step is we need to install the Azure CLI so that we have the azure library and we can connect our playwright with azure and 
//also our playwright terminal will understand the azure commands.
//use microsoft installer  for Azure CLI it will be easier.
//once its installed now we can login to azure from our local , playwright terminal
//type az login on terminal this will help you to connect playwright with your azure
//so now u have to add browser end point, which is basically we have to tell playwright to run in a particular workspace as in the previous step we just connected with azure account and here we are telling which workspace to use
//run the command shown on the browser end point step. use powershell command , and if it doesnt work then use Chatgpt , it will correct the command
//so now our playwright knows which workspace to use, this will be active till we write clear on terminal , once we clear then again we have to tun this code and establish connection.
//so now we need to store the reports also on azure right so for that we need to give permissions to our user(azure user)
//to use a storage account and load the reports , that is push the reports from playwright to azure
//for this we need to run some commands as below which will create a role for our user and give permissions to push the reports from our local playwright workspace to azure workspace.
//run the below-
// az role assignment create \
//  --assignee "390f52ff-f55f-4f0b-8e4c-f58e09e3d24b" \
// --role "Storage Blob Data Contributor" \
//  --scope "$(az storage account show --name pwstrgrrd9171 --resource-group rrd --query id -o tsv)"

//so we need to update 3 things on above code which is assignee/user ID, storage name and resource group name
//for user ID on azure workspace type microsoft entra ID and navigate to user and copy the object ID.
//again if this command gives error then use chatgpt to correct it.

//now we will see how to run our playwright tests on azure workspace.
//use the below command-
// npx playwright test --config=playwright.service.config.js --workers=4
//now ur tests are running on playwright workspaces(azure one)
//LEARN - now we need to learn how to trigger our framework from cloud jenkins, so we can set a time like 8AM 
//our command will trigger from cloud jenkins and execution will happen on azure workspace.

//NOTE-Git is an open-source version control system that lets you track changes and manage code locally. It works offline and gives you full control over your repositories. GitHub is a cloud-based platform built around Git, adding collaboration tools, automation, and a place to share projects with others.
//so we will use git hub to push our code and use gitgub for CI
//first install git in your local
//create github account online. i have used account as below-
//email- jeetdell07@gmail.com , password - Test@1234Jeet , username- Playwrightgit , repository created - QAOpsPlaywright
//now follow the below commands on CMD for your project location as below-
// git init
// git add README.md instead use git add . //this will add all the files for your project
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Playwrightgit/QAOpsPlaywright.git
// git push -u origin main

//now your entire code is in git now
//NOTE-master vs main branch in github-
//They are conceptually the same thing. The convention just changed: previously the primary branch was called master and for newer repository that defaults to main . You should only ever have one of those in a single repository (nothing breaks if you have both, but it's unlikely to be intentional).
//now we will see abot github actions
//for that go here - https://playwright.dev/docs/ci-intro

//read the yml file
//its also present on your project under folder .github/workflows, if not then follow the instructions on the website above u can create your folder structure and paste the yml file details there.
//now go to playwright.yml file to understand the things there.


//name: Playwright Tests
// on:   //on is nothing but the event for which the below mentioned jobs will trigger.in this case the trigger is on event push and pull on main, master branch.
//   push:
//     branches: [ main, master ]
//   pull_request:
//     branches: [ main, master ]
// jobs:  
//   test:
//     timeout-minutes: 60
//     runs-on: ubuntu-latest
//     steps:
//     - uses: actions/checkout@v4  //its an action , to checkout latest code on ubuntu-latest machine, ubuntu - latest is the virtual machine where all the set up is done on git hub for our code to run.
//     - uses: actions/setup-node@v4  //its also an action to set up the node runner.
//       with:
//         node-version: lts/*
//     - name: Install dependencies
//       run: npm ci  //these are shell scripts / commands
//     - name: Install Playwright Browsers
//       run: npx playwright install --with-deps
//     - name: Run Playwright tests
//       run: npx playwright test
//     - uses: actions/upload-artifact@v4  //this is action to upload reports on github that will retain for 30 days.
//       if: ${{ !cancelled() }}
//       with:
//         name: playwright-report
//         path: playwright-report/
//         retention-days: 30


//NOTE-An event is a specific activity in a repository that triggers a workflow run. For example, an activity can originate from GitHub when someone creates a pull request, opens an issue, or pushes a commit to a repository. You can also trigger a workflow to run on a schedule, by posting to a REST API, or manually.
//NOTE-A job is a set of steps in a workflow that is executed on the same runner. Each step is either a shell script that will be executed, or an action that will be run. Steps are executed in order and are dependent on each other. Since each step is executed on the same runner, you can share data from one step to another. For example, you can have a step that builds your application followed by a step that tests the application that was built.
//NOTE -An action is a pre-defined, reusable set of jobs or code that performs specific tasks within a workflow, reducing the amount of repetitive code you write in your workflow files. Actions can perform tasks such as:

// Pulling your Git repository from GitHub
// Setting up the correct toolchain for your build environment
// Setting up authentication to your cloud provider.


//now we have to make changes on the .yml file so that our execution runs on azure workspace
//previously we have seen how to run our execution from playwright which will run on azure workspace , so now 
//that we have our code in github from here we have to conenct azure workspace to run our execution on azure workspace.
//first we need to craete a service principle account , so basically we need to create a bot user to login to azure workspace
//previously we we re doing az login but from github we cant do that right so for that we will create a bit user service principle
//and those credentials we will pass to yml file 
//command to create sp-
//az ad sp create-for-rbac\ --name "github-playwright" \ --role "Contributor" \--scope "/subscriptions/e405b183-defc-4830-9a95-1477e875cee1/resourceGroups/JEET"\ --json-auth

//refined code-

// az ad sp create-for-rbac ^
//   --name "github-playwright" ^
//   --role "Contributor" ^
//   --scope "/subscriptions/e405b183-defc-4830-9a95-1477e875cee1/resourceGroups/JEET" ^
//   --json-auth


//run the above code in cmd u will get the credentials and required things for azure login

//now copy the output and go to github and navigate to settings> secrets and variables>actions>click n new repository secret,
//give the name as AZURE_CREDENTIALS and paste the value there which we got from cmd.

//now go here https://github.com/marketplace/actions/azure-login , u will find the details how to add azure login credentials on
//.yml file

//now we need to set browser end point for the github to know which workspace to use basically we are doing all the steps which we did earlier for azure workspace connection.
//for that same steps as above just add variables this time
//and mention the details on yml file
//just go to my github settings u will understand

//now for storage account permission we need to give the contributor permission for our service principle account for storage account 
//using the below code and run on cmd  , this we did earlier but for the main user now we do the same for service principle account

//az role assignment create \
//  --assignee "$(az ad sp List --display-name 'gihub-playwright' --query '[0].appID' -o tsv)"\
// --role "Storage Blob Data Contributor" \
//  --scope "$(az storage account show --name pwstrgjeet5abd --resource-group JEET --query id -o tsv)"


//refined code-
//az role assignment create ^
//   --assignee 3b05268d-d459-4625-87c4-aac5dc599ca4 ^
//   --role "Storage Blob Data Contributor" ^
//   --scope "/subscriptions/e405b183-defc-4830-9a95-1477e875cee1/resourceGroups/JEET/providers/Microsoft.Storage/storageAccounts/pwstrgjeet5abd"


//so basically use chatgpt if any error and it will guide you
//now save your changes made in .yml file

//updated .yml file looks like this-

// name: Playwright Tests
// on:
//   push:
//     branches: [ main, master ]
//   pull_request:
//     branches: [ main, master ]
// jobs:
//   test:
//     timeout-minutes: 60
//     runs-on: ubuntu-latest
//     steps:
//     - uses: actions/checkout@v4
//     - uses: actions/setup-node@v4
//       with:
//         node-version: lts/*
//     - name: Install dependencies
//       run: npm ci
//     - name: Azure Login
//       uses: azure/login@v3
//       with:
//         creds: ${{ secrets.AZURE_CREDENTIALS }}
//     - name: Run Playwright tests
//       env:
//        PLAYWRIGHT_SERVICE_URL: ${{ vars.PLAYWRIGHT_SERVICE_URL }}
//       run: npx playwright test --config=playwright.service.config.js --workers=4
//     - uses: actions/upload-artifact@v4
//       if: ${{ !cancelled() }}
//       with:
//         name: playwright-report
//         path: playwright-report/
//         retention-days: 30



//now save and commit the changes, since we are commiting directly on main branch then as per .yml file our jobs will execute see on actions tab u will understand and also on the azure workspace u will be able to see.


//now lets do one thing lets change something on calender test cases on your playwright local, just add some comments
//like test changes, we will push it to github main branch and our execution will trigger
//use the below git commands

//git status  //to check if any changes are made on any file on project
//git add <filename where changes are made>   //adding the changes to staging
//git commit -m "some comment"   //commiting the changes
//git push origin main //pushing the change to main branch.

//so once changes are pushed then pipeline will run as per the .yml file


//same is the case for pull request, when we create pull request and try to merge our changes from one branch to main branch then 
//also pipeline will run as per the .yml file

//follow the below commands for pull request

// git checkout -b jeet_fixes   checkout our code from git into new branch jeet_fixes
//git add <filename where changes are made>   //adding the changes to staging
//git commit -m "some comment"   //commiting the changes
//git push origin jeet_fixes //pushing the change to jeet_fixes branch.

//now go back to github and check the pull requests and once u click on create pull request then pipeline will run again in jeet_fixes branch
//once it runs and we have option to merge into main branch
//now we can put one check /validation on github that once pipeline is run for the sub branch then if it fails then merge to main branch should be disabled
//so for testing purpose first time dothe pull request and merge into main branch and the set this validation
//how to set the validation> go to github> settings> rules> new rule set , set branch for main and master. check results check for pass checkbox add test action (its there on yml file its our job name)
//thats it , better go to rule set and u will understand.
