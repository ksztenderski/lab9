var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

class Meme {
    constructor(id, name, prices, url) {
        this.id = id;
        this.name = name;
        this.prices = prices;
        this.url = url;
    }

    change_price(newPrice) {
        this.prices.push(newPrice);
    }
}

const most_expensive = [
    {
        'id': 10,
        'name': 'Gold',
        'prices': [1000],
        'url': 'https://i.redd.it/h7rplf9jt8y21.png'
    },
    {
        'id': 9,
        'name': 'Platinum',
        'prices': [1100],
        'url': 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg'
    },
    {
        'id': 8,
        'name': 'Elite',
        'prices': [1200],
        'url': 'https://i.imgflip.com/30zz5g.jpg'
    },
    {
        'id': 7,
        'name': 'Why',
        'prices': [1300],
        'url': 'https://i.kym-cdn.com/photos/images/original/001/492/343/782.png'
    },
    {
        'id': 6,
        'name': 'Avocado',
        'prices': [1400],
        'url': 'https://www.fosi.org/media/images/funny-game-of-thrones-memes-coverimage.width-800.jpg'
    },
    {
        'id': 5,
        'name': 'Rewatch',
        'prices': [1455, 1670, 1500],
        'url': 'https://img-9gag-fun.9cache.com/photo/aD4wV2w_700bwp.webp'
    }
]

let headerMeme = {
    'name': 'Study',
    'url': 'https://img-9gag-fun.9cache.com/photo/aGdwvYw_700bwp.webp'
}

let memes = [];

for (const mostExpensiveElement of most_expensive) {
    memes.push(new Meme(
        mostExpensiveElement.id,
        mostExpensiveElement.name,
        mostExpensiveElement.prices,
        mostExpensiveElement.url
    ));
}


app.set('memes', memes);
app.set('headerMeme', headerMeme);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true
}));

app.use('/', indexRouter);
app.use('/meme/:memeId', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
