const path = require('path');
const express = require('express');
const flash = require('connect-flash')
const session = require('express-session');
const app = express();

const sessionOptions = {secret: 'kmkcadc', resave: false, saveUninitialized: false};
app.use(session(sessionOptions));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/problems/:num', (req, res) =>{
    const { num } = req.params;
    res.render('problems/problem', {message: req.flash('failed'), num});
}) 

app.post('/problems/:num', (req, res) =>{
    const { ans } = req.body;
    const { num } = req.params;
    if (ans === 'aaa') {
        res.redirect(`/problems/${String(num)}/editorial`);
    } else {
        req.flash('failed', '不正解です');
        res.redirect(`/problems/${String(num)}`);
    }
}) 

app.get('/problems/:num/editorial', (req, res) =>{
    const { num } = req.params;
    res.render('problems/editorial', { num });
}) 

app.listen(3000, () => {
    console.log('リクエストをポート3000で待ち受け中...');
});
