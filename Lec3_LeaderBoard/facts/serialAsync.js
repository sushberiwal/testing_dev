// serially files read in async way
let fs = require("fs");

console.log("before");

fs.readFile("./f1.txt" , function(error , data){
    console.log("Content of F1 = " + data);
    fs.readFile("./f2.txt" , function(error , data){
        console.log("Content of F2 = " + data);
        fs.readFile("./f3.txt" , function(error , data){
            console.log("Content of F3 = " + data);
        })
    })
})






console.log("after");