// fs module => node js module => file system => file system => read / write / update / delete
// cheerio => used to interact with html file

// npm init -y
// npm install cheerio
let fs = require("fs");
let cheerio = require("cheerio");

// let f1KaData = fs.readFileSync("./f1.txt" , "utf-8");
// console.log(f1KaData);
// let f2kaData = fs.readFileSync("./f2.txt" , "utf-8");
// console.log(f2kaData);

let htmlKaData = fs.readFileSync("./index.html");
// console.log(htmlKaData);

let ch = cheerio.load(htmlKaData);
let pTags = ch("p").text();
// [ <p> </p> , <p> </p>   ];
// console.log(pTags);
// console.log(pTagKaText);
// dot is used for classes
let pTag = ch("ul .p-outer").text();
console.log(pTag);  

// selector for two clases on same element 
let outerPTag = ch(".p-outer.paragraph").text();
console.log(outerPTag);

// based on ids => #
let h1KaData = ch("#unique").text();
console.log(h1KaData);
