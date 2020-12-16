const fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
const getMatch = require("./match");


function getAllMatches(link){
    request( link , cb );
}

function cb(error , response , data){
    parseData(data);
}

function parseData(html){
    // console.log(html);
    let ch = cheerio.load(html);
    let allATags = ch('a[data-hover="Scorecard"]');
    // [  <a> </a> , <a> </a> , <a> </a> , <a> </a> ,<a> </a> , <a> </a> ,<a> </a> , <a> </a> upto 48 ];
    // console.log(allATags.length);
    for(let i=0 ; i<allATags.length ; i++){
        let link = cheerio(allATags[i]).attr("href");
        // console.log(link);
        let completeLink = "https://www.espncricinfo.com"+link;
        getMatch(completeLink);
    }
}


// function getAllMatches is exported
module.exports = getAllMatches;