module.exports = {
  scrapeUrl: (req, res) => {
    console.log('hello world');
    res.status(200).json({message: 'HELLO THERE'});
  }
}
