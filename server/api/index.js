const router = require("express").Router();

// controllers
const ScrapeController = require("../controllers/scrapeController");
const scrape = new ScrapeController();

router.get("/_version", (req, res, next) => {
  res.send("1");
});
router.post("/url", scrape.scrapeUrl);

module.exports = router;
