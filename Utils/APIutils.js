//here we will first create the class and then the constructor so when the class object is created
//then the constructor is run and then we will write methods inside the class.


class APIutils{


    constructor(apicontext,loginpayload)   //this is our contsructor and we are adding two arguments which will come from our code where this constructor is called.
    {                                      //here we are passing the login payload also as the argument as login payload is mandatory.
        this.apicontext=apicontext;  //this means to use the variable of this class
        this.loginpayload=loginpayload;
    }



async gettoken()
{
    const loginresponse=await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginpayload
        });

  
        const loginresponsejson= await loginresponse.json();
        const tokenretrieved =  loginresponsejson.token;
        return tokenretrieved;

}

async createorder (orderpayload)

{

    let response={}; //empty object to store session token and order id.this will store key value pair
    //below is the first key value pair we are storing.
    response.token=await this.gettoken();

    const orderresponse=await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",

    {

        data: orderpayload,
        headers:{     

            'Authorization':response.token,
            'Content-Type':'application/json'
        },
    });

        const orderresponsejson= await orderresponse.json();
        
        const orderid= orderresponsejson.orders[0];  
        response.orderid= orderid;

        return response;
}

}


module.exports = {APIutils};