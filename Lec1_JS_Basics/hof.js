// High Order Functions => function which take functions as a paramter
// Callbacks functions => functions which are passed as a paramter in a function;

function getFirstName(fullName){
    // return first name
    // fullName = "Steve Rogers";
     fullName = fullName.split(" ");  // [ "Steve" , "Rogers"   ];
     return fullName[0];
};

function getLastName(fullName){
    // return last name
    fullName = fullName.split(" ");
    return fullName[1];
};

function getName(fullName , fun){
    let name = fun(fullName);
    console.log(name);
};

getName("Steve Rogers" , getFirstName);
getName("Tony Stark" , getLastName);