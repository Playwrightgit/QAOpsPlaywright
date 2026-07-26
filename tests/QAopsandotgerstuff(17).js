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
//Resource group give some name
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

