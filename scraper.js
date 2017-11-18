// take a specific url

// analyze that page and find block level elements
// that contain h1 - h6
// followwed by 2000 words or more

const cheerio = require("cheerio");
const Readability = require("readability-node");
const uri = require("url");
const read = require("node-readability");
const sanitizer = require("sanitizer");

const scraper = function(url) {
  return new Promise((res, reject) => {
    read(url, function(err, doc) {
      if (err) {
        return reject(err);
      }
      const obj = {
        url: url,
        title: doc.getTitle().trim(),
        contents: stripHTML(doc.getContent() || "")
      };
      res(obj);
    });
  });
};

module.exports = scraper

function stripHTML(html) {
  let clean = sanitizer.sanitize(html, function(str) {
    return str;
  });
  // Remove all remaining HTML tags.
  clean = clean.replace(/<(?:.|\n)*?>/gm, "");

  // RegEx to remove needless newlines and whitespace.
  // See: http://stackoverflow.com/questions/816085/removing-redundant-line-breaks-with-regular-expressions
  clean = clean.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gi, "\n");

  // Return the final string, minus any leading/trailing whitespace.
  return clean.trim();
}
