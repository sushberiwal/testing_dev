// code => 3 files => with the help of promise => serially read
let fs = require("fs");

let f1KaPromise = fs.promises.readFile("./f1.txt");

// promise hell => Promise Chaining 
f1KaPromise.then(function scb(data) {
    console.log("Content " + data);
    let f2kaPromise = fs.promises.readFile("./f2.txt");
    f2kaPromise.then(function scb(data){
      console.log("Content " + data);
      let f3KaPromise = fs.promises.readFile("./f3.txt");
      f3KaPromise.then(function scb(data){
          console.log("Content " + data);
          });
    });
  });



