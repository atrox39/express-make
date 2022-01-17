const hbs = require('express-handlebars');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
const HTTP_PORT = 8000;

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(flash());
app.use(methodOverride('_method'));
app.use(cors());

// EXPRESS SESSION
app.use(session({
    secret:'your-secret-key',
    resave:true,
    saveUninitialized:true
}));

// HANDLEBARS CONFIG
app.set('views', 'views');
app.engine('hbs', handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    extname: '.hbs',
    helpers:{}
}));
app.set('view engine', 'hbs');

// SERVER INIT
app.listen(HTTP_PORT, ()=>{
    console.log(`HTTP SERVER LISTEN ON http://localhost:${HTTP_PORT}`);
});