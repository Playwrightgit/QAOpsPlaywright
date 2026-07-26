"use strict";
//typescript code below-
let message1 = "Hello";
console.log(message1);
let age1 = 20;
console.log(age1);
let numbers1 = [1, 2, 3]; //declaring array.
console.log(numbers1);
let data = "Hi how are you";
//any we will use when we are not sure of data type.
//now if we assign 
data = 2; //now here typescript will not give error as we used
//any data type so on runtime it will decide the datatype and applies the same.
console.log(data);
let isactive = false;
//for function below way we have to write
function add(a, b) {
    return a + b;
}
add(3, 4);
//below is the way you declare object
let user = { name: "Jeet", age: 32 };
//now unlike javascript where if we write user.location="Hyderabad"; it will add another key value pair but in typescript we cannot do that
//so we have to initialize and decalare before only as below-
let user1 = { name: "Jeet", age: 32, location: "Delhi" };
user1.location = "Hyderabad";
console.log(user1);
//now we will see how to write code in typescript for constructor-we will see that for pageobject file CartPage.js, created another file CartPagenew.ts
