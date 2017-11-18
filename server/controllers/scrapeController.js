const Scraper = require("../lib/scraper");
const scraper = new Scraper();

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
