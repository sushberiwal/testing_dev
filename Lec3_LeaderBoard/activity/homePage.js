// homepages.js => request to espn homepage => gives html of espn home page
// npm install request
// request module is used to get html file of a website

const fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
const getAllMatches = require("./allMatches");


request( "https://www.espncricinfo.com/series/_/id/8039/season/2019/icc-cricket-world-cup"   , cb  );

function cb(error , response , data){
    myfun(data);
}


function myfun(html){

    let ch = cheerio.load(html); // html file is loaded in cheerio
    let link = ch(".widget-items.cta-link a").attr("href"); // cheerio gives us function to get elements of html file    
    let completeLink = "https://www.espncricinfo.com"+link;
    // console.log(completeLink);
    getAllMatches(completeLink);
}
