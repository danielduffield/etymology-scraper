// take a specific url

// analyze that page and find block level elements
// that contain h1 - h6
// followwed by 2000 words or more

const cheerio = require("cheerio");
const Readability = require("readability-node");
const uri = require("url");
const read = require("node-readability");
const sanitizer = require("sanitizer");
const nlp = require("compromise");
const _ = require("lodash");

function getDictionaryEntry(noun) {
  return Promise.resolve({ word: noun, etymology: `${noun} etymology` });
}

const memcache = {};
const scraper = function(url) {
  return new Promise((res, reject) => {
    if (!memcache[url]) {
      read(url, function(err, doc) {
        if (err) {
          return reject(err);
        }
        let obj = {
          url: url,
          title: doc.title,
          contents: stripHTML(doc.content || "")
        };
        memcache[url] = obj;
        return res(obj);
      });
    } else {
      return res(memcache[url]);
    }
  }).then(article => {
    const nouns = analyzeArticle(article.contents);
    return Promise.all(nouns.map(noun => getDictionaryEntry(noun))).then(
      allEntries => {
        article.etymologies = allEntries;
        return article;
      }
    );
  });
};

function stripHTML(html) {
  let clean = sanitizer.sanitize(html, function(str) {
    return str;
  });
  clean = clean.replace(/<(?:.|\n)*?>/gm, "");
  clean = clean.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gi, "\n");
  return clean.trim();
}

function topTwenty(array) {
  return _.take(array, 20);
}
function analyzeArticle(contents) {
  const parsed = nlp(contents);
  const nouns = parsed.nouns().out("topk");
  return topTwenty(nouns);
}

module.exports = scraper;
