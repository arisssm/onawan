var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/** ====== Variabel untuk mengakses route ====== */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
/** =========================================== */


var app = express();

/** ==== Setup Mongoose */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/onawan');

/** ===== */
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

/** ==== Express Session modul */
const session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}));

/** ====== Connect Flash modul */
const flash = require('connect-flash');
app.use(flash());

/** ====== Mengatur format file untuk tampilan ======*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/** =========================================== */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** ====== Mengakses template admin ======*/
app.use('/sb-admin-2',express.static(path.join(__dirname,'node_modules/startbootstrap-sb-admin-2')));
app.use('/admin-lte',express.static(path.join(__dirname,'node_modules/admin-lte')));
/** =========================================== */

/** ====== Mengakses route atau url browser ======*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
/** ============================================== */

/** ====== Menangkap dan meneruskan ke bagian error handler ======*/
app.use(function(req, res, next) {
  next(createError(404));
});

/** ====== Menangani error  pada aplikasi (error handler) ======*/
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
