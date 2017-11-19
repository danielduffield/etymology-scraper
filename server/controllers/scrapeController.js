const Scraper = require("../lib/scraper");
const scraper = new Scraper();

const Word = require("../lib/word");
const word = new Word();

// word.isWordInRedis('string key');
// word.saveWordInRedis('science');

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
