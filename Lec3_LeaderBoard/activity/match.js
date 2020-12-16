let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");

let leaderboard = [];
let count = 0;

function getMatch(link){
    console.log("Sending Request !!!" , count);
    count++;
    request(link , cb); // => async function => 48 times 
}

function cb(error , response , data){
    count--;
    console.log("Receved response !!!" , count);
    myfun(data);

    if(count == 0){
        console.table(leaderboard);
    }
}

function myfun(data){
    let ch = cheerio.load(data);
    let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");
    // [ <div> </div> , <div> </div>    ]
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = cheerio(bothInnings[i]).find(".header-title.label").text();
        teamName = teamName.split("Innings")[0].trim();
        // console.log(teamName);
        let allBatsmanDetails = cheerio(bothInnings[i]).find(".table.batsman tbody tr");
        // [ <tr> </tr> , <tr> </tr>  , <tr> </tr>  ,<tr> </tr>  , <tr> </tr> ];
        for(let j=0 ; j<allBatsmanDetails.length ; j++){
            let allTds = cheerio(allBatsmanDetails[j]).find("td");
            // [ <td> </td> , <td> </td> ,<td> </td> ]
            if(allTds.length > 1 ){
                // 0,2,3,5,6,7
                let batsmanName = cheerio(allTds[0]).find("a").text().trim();
                let runs = cheerio(allTds[2]).text().trim();
                let balls = cheerio(allTds[3]).text().trim();
                let fours = cheerio(allTds[5]).text().trim();
                let sixes = cheerio(allTds[6]).text().trim();
                // String interpolation
                // ek batsman ki detail aati hai 
                // console.log( `Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} SR = ${strikeRate}`);
                createLeaderBoard(teamName , batsmanName , runs, balls , fours , sixes);
            }
        }
    }
}


function createLeaderBoard(teamName , batsmanName , runs, balls , fours , sixes){
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);

    for(let i=0 ; i<leaderboard.length ; i++){
        if(leaderboard[i].Team == teamName && leaderboard[i].Batsman == batsmanName){
            leaderboard[i].Runs += runs;
            leaderboard[i].Balls += balls;
            leaderboard[i].Fours += fours;
            leaderboard[i].Sixes += sixes;
            return;
        }
    }

    // when batsman is not in the leaderboard
    let entry = {
        Team : teamName,
        Batsman : batsmanName ,
        Runs : runs ,
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes
    }
    leaderboard.push(entry);
}


module.exports = getMatch;