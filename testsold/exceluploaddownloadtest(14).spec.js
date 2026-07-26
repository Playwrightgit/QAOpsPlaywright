//so we have copy pasted the excel code here and first thing mention the dependencies on package.json
//i.e-  "dependencies": {
//    "exceljs": "^4.4.0"
//now on console type npm install

//next thing we are going to verify on the site - first download the file, edit and reupload and verify the changes.


const {test,expect} = require ("@playwright/test");

const ExcelJs = require('exceljs');



async function writeexcel(searchText,replaceText,change,filePath) 
{
     

    const workbook= new ExcelJs.Workbook();
   
    await workbook.xlsx.readFile(filePath); 
    const worksheet=workbook.getWorksheet('Sheet1');
    
    const output = await readexcel(worksheet,searchText); 
    await console.log(output);

    const cell= worksheet.getCell(output.rownumber,output.columnnumber+change.colChange);
    //const cell= worksheet.getCell(2,4); 
    cell.value=replaceText; 
    await workbook.xlsx.writeFile(filePath);
}

async function readexcel(worksheet,searchText)
{


    let output = {rownumber:-1,columnnumber:-1};

    
    worksheet.eachRow((row,rowNumber)=>

         
    {

        row.eachCell((cell,columnNumber)=> //
        {

            if (cell.value === searchText)
            {
                output.rownumber = rowNumber;
                output.columnnumber = columnNumber;
            }

        })

       
    })

     return output;

}

//now we will create a test and from that we will call the writeexcel method

test("upload download excel test", async ({page})=>
{
        const searchText = "Kivi";
        const replaceText = "5000";
        //const filePath= "C:/Users/JEET/Downloads/Eng new/download.xlsx"
        await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

        //now we have to download the file , and the download might take few min, so write the download code in the 
        //middle along with the codes added up and below

        
        const download= page.waitForEvent('download'); //this code will wait for the event download to happen
        await page.getByRole('button', { name: 'Download' }).click();
        
        const dl=await download;// this code will wait till the event download is complete.
        //also we are storing this in a variable otherwise playwright will delete the file .read in google-
        //When Playwright isn't downloading a file, it is usually because the script doesn't explicitly wait for the download event to complete before moving on, or the browser context is being destroyed prematurely.
        const filepath=await dl.path();//this code is required to get the file path, so playwright basically stores the file temporarily then we need to catch the path explicitly
        //await page.pause();
        await console.log(filepath);
        await writeexcel(searchText, replaceText, { rowChange: 0, colChange: 2 },filepath);
        //we are writing await here so that playwright will ensure edit is complete before upload.

        await page.locator('#fileinput').setInputFiles(filepath);//setunputfiles function is used to uplaod file from
        //system outside the web, also it will work on the chose file button or element only if the 
        //element locator has attribure type=file, otherwise ask the developer to add the attribute.

        const desiredRow = await page.getByRole('row').filter({ has: page.getByText(searchText) });
        //above code is used to get the exact row details
        //so first we search the elements with get by role to search for the elements having attribute role=row
        //then we will filter those elements with another locator searching for the searchText, so in whichever
        //row we ge the searchText we will get control of that particular row.

        //now below we will write the assertion by using .locator not on page level insted on the desiredRow which
        //contains the row details.
        await page.pause();
        await expect(desiredRow.locator('#cell-4-undefined')).toContainText(replaceText);
});




//Note- to open UI test runner of playwright use --ui flag at the end of execution command.
//eg-npx playwright test  tests/exceluploaddownloadtest(14) --ui






