let fs = require("fs");

console.log("Before");

fs.readFile("./f1.txt" , cb);

function cb(error , data){
        console.log("Content of F1 :" + data);
}

console.log("After");
while(true){
 // infinite loop   
}


// => sync and async function
