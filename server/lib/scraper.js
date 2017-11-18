// take a specific url

// analyze that page and find block level elements
// that contain h1 - h6
// followwed by 2000 words or more

const cheerio = require("cheerio");
const uri = require("url");
const read = require("node-readability");
const sanitizer = require("sanitizer");
const nlp = require("compromise");
const _ = require("lodash");

class Scraper {
  constructor() {
    this.memcache = {};
  }
  scrape(url) {
    return new Promise((res, reject) => {
      if (!this.memcache[url]) {
        read(url, (err, doc) => {
          if (err) {
            return reject(err);
          }
          let obj = {
            url: url,
            title: doc.title,
            contents: this.stripHTML(doc.content || "")
          };
          this.memcache[url] = obj;
          return res(obj);
        });
      } else {
        return res(this.memcache[url]);
      }
    }).then(article => {
      const nouns = this.analyzeArticle(article);
      return Promise.all(nouns.map(noun => this.getDictionaryEntry(noun))).then(
        allEntries => {
          article.etymologies = allEntries;
          return article;
        }
      );
    });
  }
  analyzeArticle({ contents }) {
    const parsed = nlp(contents);
    const nouns = parsed.nouns().out("topk");
    return this.topTwenty(nouns);
  }
  stripHTML(html) {
    let clean = sanitizer.sanitize(html, function(str) {
      return str;
    });
    clean = clean.replace(/<(?:.|\n)*?>/gm, "");
    clean = clean.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gi, "\n");
    return clean.trim();
  }
  topTwenty(array) {
    return _.take(array, 20);
  }
  getDictionaryEntry(noun) {
    return Promise.resolve({ word: noun, etymology: `${noun} etymology` });
  }
}

module.exports = Scraper;
