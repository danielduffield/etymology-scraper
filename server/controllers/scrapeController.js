const scraper = require("../lib/scraper");
module.exports = {
  scrapeUrl: (req, res) => {
    const body = req.body;
    if (body.url) {
      return scraper(body.url).then(article => {
        return res.json(article.contents);
      });
    }
    return res.status(400).send("No Url Found");
  }
};
