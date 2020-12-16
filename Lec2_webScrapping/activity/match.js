
let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");


function getMatch(link){
    request(link , cb);
}

function cb(error , response , data){
    myfun(data);
}

function myfun(data){
    let ch = cheerio.load(data);
    let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");
    // [ <div> </div> , <div> </div>    ]
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = cheerio(bothInnings[i]).find(".header-title.label").text();
        teamName = teamName.split("Innings")[0].trim();
        console.log(teamName);
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
                let strikeRate = cheerio(allTds[7]).text().trim();
                // String interpolation
                // ek batsman ki detail aati hai 
                // console.log( `Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} SR = ${strikeRate}`);
                processDetails(teamName , batsmanName , runs, balls , fours , sixes , strikeRate);
            }
        }
    }
}

function checkTeamFolder(teamName){
    // path => /India
    // teamName => India
    return fs.existsSync(teamName);
}

function checkBatsmanFile(teamName , batsmanName){
    // teamName = India
    // batsmanName = MSdhoni
    let batsmanPath = teamName+"/"+batsmanName+".json";
    // path =>       /India/MSdhoni.json;
    return fs.existsSync(batsmanPath);
}

function updateBatsman(teamName , batsmanName , runs, balls , fours , sixes , strikeRate){
    // pehle se file hai batsman ki
    let batsmanPath = teamName+"/"+batsmanName+".json";
    let batsmanFile = fs.readFileSync(batsmanPath);

    batsmanFile =  JSON.parse(batsmanFile);
    let inning = {
        Runs : runs,
        Balls : balls,
        Fours : fours ,
        Sixes : sixes ,
        SR : strikeRate
    }
    batsmanFile.push(inning);
    batsmanFile = JSON.stringify(batsmanFile);
    fs.writeFileSync(batsmanPath , batsmanFile);  
}
function createBatsmanFile(teamName , batsmanName , runs, balls , fours , sixes , strikeRate){
    let batsmanPath = teamName+"/"+batsmanName+".json";
    // path =>       /India/MSdhoni.json;
    let entries = [];
    let inning = {
        Runs : runs,
        Balls : balls,
        Fours : fours ,
        Sixes : sixes ,
        SR : strikeRate
    }
    entries.push(inning);
    entries = JSON.stringify(entries);
    fs.writeFileSync( batsmanPath  , entries );
}

function createTeamFolder(teamName){
    // teamName = India
    fs.mkdirSync(teamName);
}

function processDetails(teamName , batsmanName , runs, balls , fours , sixes , strikeRate){
// details batsman ki 
// check if team folder exist ?
// if yes => check if batsman file exist ? => if yes => update batsmanfile else create batsman file
// else create Team Folder => create batsman file 
    let isTeamFolder = checkTeamFolder(teamName);
    if(isTeamFolder == true){
        // team folder exists
        let isBatsman = checkBatsmanFile(teamName , batsmanName);
        if(isBatsman == true){
            updateBatsman(teamName , batsmanName , runs, balls , fours , sixes , strikeRate);
        }
        else{
            // batsman doesnt exist
            createBatsmanFile(teamName , batsmanName , runs, balls , fours , sixes , strikeRate);    
        }
    }
    else{
        // team folder doesnt exists
        createTeamFolder(teamName);
        createBatsmanFile(teamName , batsmanName , runs, balls , fours , sixes , strikeRate);
    }
}

module.exports = getMatch;