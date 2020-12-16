let fs = require("fs");

let pendingPromise = fs.promises.readFile("./f1.txt");
// then bhi ek promise deta hai

pendingPromise.then(function(data){
    console.log("Content = "+ data); 
})
.then(function(){
    let f2kaPromise = fs.promises.readFile("./f2.txt");
    return f2kaPromise;
})
.then(function(data){
    console.log("Content = "+ data);  
})
.then(function(){
    let f3KaPromise = fs.promises.readFile("./f3.txt");
    return f3KaPromise;
})
.then(function(data){
    console.log("Content = "+ data);
})
.catch(  function(error){
    console.log("Inside catch !!!");
    console.log(error); 
})