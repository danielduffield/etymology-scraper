const router = require("express").Router();

// controllers
const scrape = require("../controllers/scrapeController");

router.get("/_version", (req, res, next) => {
  res.send("1");
});
router.post("/url", scrape.scrapeUrl);

module.exports = router;
