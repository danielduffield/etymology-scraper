const router = require('express').Router();

// controllers
const scrape = require('../controllers/scrapeController');

router.get('/url', scrape.scrapeUrl);

module.exports = router;
