const express = require('express');
const shortId = require('shortid');
const ejs = require('ejs');
var flash = require('connect-flash');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var session = require('express-session');


const app = express();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shortUrl');

}

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
}))
app.use(flash());




const shortschema = new mongoose.Schema({
    completeurl: {
        type: String,
        required: true
    },
    note: {
        type: String,
    },
    shortedurl: {
        type: String,
        required: true,
        default: shortId.generate
    },
})

const ShortUrl = mongoose.model('ShortUrl', shortschema);


app.get('/', async (req, res) => {
    res.render('main');
})

// app.get('/search', async (req, res) => {
//     let temp2 = req.flash('success2')
//     let temp3 = req.flash('success4')
//     let temp4 = req.flash('success6')
//     res.render('search', { success: temp2, shortUrls: temp3, success4: temp4 });
// })


// app.get('/index', async (req, res) => {
//     let temp1 = req.flash('success1')
//     let temp2 = req.flash('success3')
//     let temp3 = req.flash('success5')
//     let temp4 = req.flash('success6')
//     const url2 = await ShortUrl.find({ fullurl: temp2 });

//     // console.log(url2);
//     res.render('index', { success: temp1, shortUrls: url2, success1: temp3, success2: temp4 });
// })



// app.post('/index', async (req, res) => {
//     const FullUrl = req.body.fullUrl;
//     const Note = req.body.note;
//     const url = await ShortUrl.find({ fullurl: FullUrl });
//     const note = await ShortUrl.find({ note: Note });

//     // console.log(note);
//     if (note.length > 0) {
//         req.flash('success6', "Note already exists")
//         return res.redirect('/index');
//     }

//     if (url.length == 0) {
//         const shortUrl = new ShortUrl({
//             fullurl: FullUrl,
//             note: Note
//         })

//         let temp = shortUrl.save();
//         if (temp) {
//             req.flash('success1', "Short URL created successfully")
//             req.flash('success3', FullUrl)
//         }

//         res.redirect('/index');
//     }
//     else {
//         // console.log("note already exists1212")
//         req.flash('success2', "Short URL already exists, you can search short url here")
//         res.redirect('/search')

//     }
// })

// app.post('/search', async (req, res) => {
//     const FullUrl1 = req.body.fullUrl1;
//     let Note1 = req.body.note1;
//     let url1;
//     // console.log(FullUrl1,Note1);
//     if (FullUrl1 == "" && Note1 == "") {
//         req.flash('success6', "Fill out one of the section below to search");
//         return res.redirect('/search');
//     }
//     if (FullUrl1 != "") {
//         url1 = await ShortUrl.find({ fullurl: FullUrl1 });
//     }
//     else if (Note1 != "") {
//         url1 = await ShortUrl.find({ note: Note1 });
//     }

//     // console.log(url1)

//     if (url1.length > 0) {
//         req.flash('success4', url1);
//         res.redirect('/search');
//     }
//     else {
//         req.flash('success5', "Short URL not exists, you can create short url here")
//         res.redirect('/index')
//     }

// })

// app.get('/:shortUrl', async (req, res) => {
//     const temp = await ShortUrl.findOne({ short: req.params.shortUrl });
//     if (temp == null) return res.sendStatus(404);

//     temp.save();
//     res.redirect(temp.fullurl);
// })

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`listening on port ${port}`);
});