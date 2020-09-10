//Twitter Bot backend... also sends its own feedparser call to retrieve feeds listed in allFeeds

const Twit = require("twit");
const config = require("./config");
const getFeed = require("./getFeed");
const today = new Date();
const dateFormatted = `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

var time = 300000;
//var time = 10000;

const T = new Twit(config);


//Keep Heroku App Awake
var http = require("http");
setInterval(function() {
  http.get("http://allhashflags.herokuapp.com");
}, time); // every 5 minutes (300000)

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function slowIterate(array,count){

    let arr = array[count]
    status = `hashflag alert!: #${arr.hashtag}, this hashflag is available from ${new Date(parseInt(arr.startingTimestampMs)).toLocaleDateString("en-US", options)} to ${new Date(parseInt(arr.endingTimestampMs)).toLocaleDateString("en-US", options)}`
    T.post('statuses/update', { status: status }, (err, data, response) => {console.log(data)})
    console.log({status,arr})
    count--;

    if (count>0) {

        setTimeout(function(){slowIterate(array,count)},time)

    }  
    
}

function fetchFeeds() {
  
    getFeed(`https://pbs.twimg.com/hashflag/config-${dateFormatted}.json`).then((body) => { 
        
        var myobj = JSON.parse(body);
    
        return myobj

    }).then((obj)=>{

        var size = Object.keys(obj).length;
        slowIterate(obj, size-1)
        
    }).then( ()=>{
        setInterval(fetchFeeds,60000*720) 
        //restart the slow iterate every twelve hours
       }  
    )

}

fetchFeeds()
