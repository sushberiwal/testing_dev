// code => 3 files => with the help of promise => parallely read

let fs = require("fs");


// node api pe ek saath jaayemge
let f1KaPromise = fs.promises.readFile("./f1.txt");
let f2kaPromise = fs.promises.readFile("./f2.txt");
let f3KaPromise = fs.promises.readFile("./f3.txt");

f1KaPromise.then(scb);
f1KaPromise.catch(fcb);

f2kaPromise.then(scb);
f2kaPromise.catch(fcb);

f3KaPromise.then(scb);
f3KaPromise.catch(fcb);


function scb(data){
console.log("Content " + data);
}

function fcb(error){
console.log(error);
}