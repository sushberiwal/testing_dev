let fs = require("fs");

       
let pendingPromise = fs.promises.readFile("./f1.txt");

// console.log(pendingPromise);


// success
pendingPromise.then(function(data){
    console.log("Inside then !!");
    console.log("Content = "+ data); // success callback attached
});

// fail
pendingPromise.catch(  function(error){
    console.log("Inside catch !!!");
    console.log(error); // failed callback attached
})

