const redis = require("redis");
const client = redis.createClient();
const axios = require("axios");
const parser = require('xml2json');
const util = require('util');
const parseString = require('xml2js').parseString;

client.on("error", (err) => {
  console.log("Error ", err);
});

const dictionary_api = process.env.DICTIONARY;

// client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');
//
// client.hgetall('frameworks', function(err, object) {
//     console.log(object);
// });

client.set("string key", "string val", redis.print);
// client.get("string key", (err, object) => {
//   console.log(object);
// });

class Word {
  isWordInRedis(word) {
    console.log("check word is in redis");
    // check to see if word is in redis
    client.get(word, (err, object) => {
      if (err) {
        return err;
      }
      return object;
    });
  }

  saveWordInRedis(word) {
    console.log("save word in redis");
    const url =
      `https://www.dictionaryapi.com/api/v1/references/collegiate/xml/${word}?key=${dictionary_api}`;

    axios
      .get(url)
      .then(response => {
        parseString(response.data, function (err, result) {
          // console.log(util.inspect(result.entry_list.entry[0].def[0].date[0], { showHidden: true, depth: null }));
          const document = {};
          const etm = [];
          let word = result.entry_list.entry[0].$.id;
          let date = result.entry_list.entry[0].def[0].date[0];
          let key = result.entry_list.entry[0].et[0]._;
          let value = result.entry_list.entry[0].et[0].it;
          key = key.split('  ');
          // console.log('key', key);
          // console.log('value', value);
          for (let i = 0; i < key.length; i++) {
            if (value[i] === undefined) {
              let obj = {};
              obj[key[i]] = null;
              etm.push(obj);
            } else {
              let obj = {};
              obj[key[i]] = value[i];
              etm.push(obj);
            }
          }

          document['etm'] = etm;
          document['word'] = word;
          document['date'] = date;
          console.log('document to save', document);
          client.set(word, JSON.stringify(document), redis.print);
        });
      })
      .catch(error => {
        console.log(error);
      });
    // make a request to merriam webster
    // save word in redis
  }
}

module.exports = Word;
