var express = require('express');
var router = express.Router();

function get_meme(memes, id) {
    return memes.find(meme => meme.id === id);
}

/* GET home page. */
router.get('/', function (req, res, next) {
    let memes = req.app.get('memes');
    memes.sort((a, b) => b.prices[b.prices.length - 1] - a.prices[a.prices.length - 1]);
    res.render('index', {
        title: 'Meme market',
        message: 'Hello there!',
        memes: memes.slice(0, 3),
        headerMeme: req.app.get('headerMeme')
    });
});

router.get('/meme/:memeId', function (req, res) {
    let meme = get_meme(req.app.get('memes'), parseInt(req.params.memeId));
    if (meme !== undefined) {
        res.render('meme', {meme: meme});
    } else {
        res.render('meme_not_found', {id: req.params.memeId});
    }
})

router.post('/meme/:memeId', function (req, res) {
    let meme = get_meme(req.app.get('memes'), parseInt(req.params.memeId));
    let price = req.body.price;
    console.log(meme.prices);
    meme.change_price(price);
    console.log(meme.prices);
    console.log(req.body.price);
    res.render('meme', {meme: meme})
})

module.exports = router;
