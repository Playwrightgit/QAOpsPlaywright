//typescript code below-

let message1:String="Hello";
console.log(message1);
let age1:Number=20;
console.log(age1);
let numbers1:number[]=[1,2,3];//declaring array.
console.log(numbers1);

let data:any="Hi how are you";
//any we will use when we are not sure of data type.
//now if we assign 
data=2; //now here typescript will not give error as we used
//any data type so on runtime it will decide the datatype and applies the same.
console.log(data);

let isactive:boolean=false;

//for function below way we have to write
function add(a:number,b:number) :number //this number is return datatype like what this function is returning that values datatype
{
    return a+b;
}
add(3,4);

//below is the way you declare object

let user : {name:string,age:number}={name:"Jeet",age:32};
//now unlike javascript where if we write user.location="Hyderabad"; it will add another key value pair but in typescript we cannot do that
//so we have to initialize and decalare before only as below-

let user1:{name:String,age:number,location:String} = {name:"Jeet",age:32,location:"Delhi"};
user1.location="Hyderabad";
console.log(user1);


//now we will see how to write code in typescript for constructor-we will see that for pageobject file CartPage.js, created another file CartPagenew.ts

