
Investigate dictionary apis

Create input for a page link

scrape page

find main content on that page

send content to NLP

analyze NLP output for top words

if words found in DB, use db cached data.
(caching is key in order to make this work, eventually we will have everything, the english language doesnt change that much)

If not, hit webster api for results and save in DB

load article text in medium-like UI

set up css for the different etymology

when user hovers over a highlighted word, a a popup appears on the side that shows the etymological information for that word.

create permalinks for the article so it can be shared and loaded.


Potential Problems:
A lot of words don't have etymological data, is there a pattern for these words? Is there a specific reason these words have no etymological data? is it just a shitty dictionary api



Potential Architecture

HTML/CSS/Jquery on front end
Potential Contract, send website urls to API service, display html JSON sent from the server

Api Service (written in JS, using express and a web scraper): Receive website urls, scrape site and load top words. (Possibly use headless browser for this to work around shitty scrapers)
Receives: Website url
Responds: HTML/JSON Data for the site, the highlighted words and their etymological information

Word Analysis Micro Service (possibly written in golang to take advantage of concurrency?): Loads cached results from the DB, and hits webster API for anything it doesnt have. Returns a specific word, with the etymological data for that word
Receives specific words
Responds: etymological data on those words. 


