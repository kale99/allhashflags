//Twitter Bot backend... also sends its own feedparser call to retrieve feeds listed in allFeeds

const Twit = require("twit");
const config = require("./config");
const getFeed = require("./getFeed");
//const getImageURL = require("./getImageURL");
var fs = require("fs");

const T = new Twit(config);

var urlSet = new Set();

//Keep Heroku App Awake
var http = require("http");
setInterval(function() {
  http.get("http://allhashflags.herokuapp.com");
}, 300000); // every 5 minutes (300000)

var request = require("request");

var download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    if (res) {
      console.log("content-type:", res.headers["content-type"]);
      console.log("content-length:", res.headers["content-length"]);
    } else {
      console.log("undefined");
    }

    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", callback);
  });
};

function fetchFeeds() {
  
    getFeed('https://pbs.twimg.com/hashflag/config-2020-09-08.json').then((body) => { 
        console.log(body)
    })
    //   if (!err) {
        

    //         console.log(feedItems);
    //         T.post('statuses/update', { status: 'hello world!' }, (err, data, response) => {console.log(data)})
         
            // urlSet.add(feedItems[i].link);
            
            // getImageURL(feedItems[i].link, feedItems[i], "", "").then(result => {
              
  
            //   if (err) {
            //     throw new Error(
            //       "exception getting matching image for news article"
            //     );
            //   }
              
            //     var newsStory =
            //             "#" +
            //             result.feedItem.categories[0].replace(/\s/g, "") +
            //             ": " +
            //             result.feedItem.title +
            //             " " +
            //             result.feedItem.link +
            //             " #svgnewsbot";
            

            //   const filename = "./media/test" + Date.now() + ".jpeg";

            //   download(result.newTest, filename, data => {
            //    // console.log("data from download image function", data);

            //     var b64content = fs.readFileSync(filename, {
            //       encoding: "base64"
            //     });

            //     // first we must post the media to Twitter
            //     T.post("media/upload", { media_data: b64content }, function(
            //       err,
            //       data,
            //       response
            //     ) {
            //       if (err) {
            //         console.log("EXCEPTIONUPLOAD", err);
            //         throw new Error("exception upload!");
            //       }

            //       // now we can assign alt text to the media, for use by screen readers and
            //       // other text-based presentations and interpreters
            //       var mediaIdStr = data.media_id_string;
            //       var altText = "News story";
            //       var meta_params = {
            //         media_id: mediaIdStr,
            //         alt_text: { text: altText }
            //       };

            //       T.post("media/metadata/create", meta_params, function(
            //         err,
            //         data,
            //         response
            //       ) {
            //         if (!err) {
                    
            //           // now we can reference the media and post a tweet (media will attach to the tweet)
            //           var params = {
            //             status: newsStory,
            //             media_ids: [mediaIdStr]
            //           };

            //           console.log(newsStory, mediaIdStr);
            //           fs.unlinkSync(filename);

            //             T.post("statuses/update", params, function(
            //             err,
            //             data,
            //            response
            //            ) {
            //             //console.log(data);
            //              });  
            //         }
            //       });
            //     });
            //   }); //download

            //   //console.log(newsStory + ".\n");
            // }); //get ImageURL
         //forFeedItems

     
    //   } else {
    //     console.log("FeedParser errors, get feed didnt work");
    //   }
   // }); //getFeed
}

var time = 3000000;

//var time = 10000;

//Fetching the feed occurs according to frequency indicated in time
setInterval(fetchFeeds, time);
