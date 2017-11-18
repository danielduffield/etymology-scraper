const mocha = require("mocha");
const Scraper = require("../server/lib/scraper");
const scraper = new Scraper();

const expect = require("chai").expect;

describe("Scraper", function() {
  this.timeout(5000);
  it("handles washingtonpost articles", () => {
    const url =
      "https://www.washingtonpost.com/news/theworldpost/wp/2017/11/02/plane-pollution/?utm_term=.f8fb2c314f03";
    return scraper.scrape(url).then(article => {
      expect(article)
        .to.haveOwnProperty("title")
        .eql("Opinion | For the love of Earth, stop traveling");
    });
  });
  it("handles new york times articles", () => {
    const url =
      "https://www.nytimes.com/2017/11/18/us/politics/ron-johnson-senate-tax-cut.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=first-column-region&region=top-news&WT.nav=top-news";
    return scraper.scrape(url).then(article => {
      expect(article)
        .to.haveOwnProperty("title")
        .eql(
          "Why a Firm Believer in Tax Cuts Could Derail the Senate Tax Cut Plan"
        );
    });
  });
  it("handles la times articles", () => {
    const url =
      "http://beta.latimes.com/local/lanow/la-me-ln-gemmel-moore-autopsy-20171118-story.html#nt=oft12aH-1gp2";
    return scraper.scrape(url).then(article => {
      expect(article)
        .to.haveOwnProperty("title")
        .eql(
          "Democratic donor's home was littered with drug paraphernalia after man died, coroner says"
        );
    });
  });
});
