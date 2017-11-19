const util = require('util');
const Scraper = require("../lib/scraper");
const scraper = new Scraper();

const Word = require("../lib/word");
const word = new Word();

// word.isWordInRedis('string key');

// word.setWordInRedis('astronomy');
// word.setWordInRedis('science');
// word.setWordInRedis('literature');

// const wordArr = ['astronomy', 'literature', 'acapella', 'arithmetic'];
const wordArr = ['acapella', 'acapella', 'macaronic'];
// word.getWordInRedis('astronomy');
// const redis_word = word.getWordInRedis('literature');
// console.log('redis word', redis_word);

// Promise.all(wordArr.map(item => word.isWordInRedis(item)))
//   .then(() => {
//     Promise.all(wordArr.map(item => word.getWordInRedis(item)))
//       .then(data => {
//         console.log('array docs', util.inspect(data, { showHidden: true, depth: null }));
//       });
//   });

Promise.all(wordArr.map(item => word.getWordInRedis(item)
  .then(result => result
    ? Promise.resolve(result)
    : word.setWordInRedis(item))
  ))
  .then(data => {
    console.log('array docs', util.inspect(data, { showHidden: true, depth: null }));
  });

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
