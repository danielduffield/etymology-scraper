const Scraper = require("../lib/scraper");
const scraper = new Scraper();

const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => {
  console.log("Error ", err);
});

// client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');
//
// client.hgetall('frameworks', function(err, object) {
//     console.log(object);
// });

// client.set("string key", "string val", redis.print);
// client.get("string key", (err, object) => {
//   console.log(object);
// });

class ScrapeController {
  scrapeUrl(req, res) {
    const body = req.body;
    if (body.url) {
      return scraper.scrape(body.url).then(article => {
        return res.json(article);
      });
    }
    return res.status(400).send("No Url Found");
  }
}
module.exports = ScrapeController;
