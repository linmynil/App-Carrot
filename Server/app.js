var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
require('./Components/categories/CategoryModel');
require('./Components/products/ProductModel');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productRouter =  require('./routes/product');
const dientichRouter =  require('./routes/dientich');
const chuviRouter =  require('./routes/chuvi');
const ProductAPIRouter =  require('./routes/api/ProductAPI');
const UserAPIRouter =  require('./routes/api/UserAPI');
const ProductcPanelRouter =  require('./routes/cpanel/ProductcPanel');
const UsercPanelRouter =  require('./routes/cpanel/UsercPanel');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'iloveyou',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

mongoose.connect('mongodb://127.0.0.1:27017/CP17309', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));


// khai bao cac duong dan link
//http://localhost:3000/
app.use('/', indexRouter);
app.use('/users', usersRouter);
//http://localhost:3000/abc
app.use('/abc', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/dien-tich', dientichRouter);
app.use('/chu-vi', chuviRouter);
//http://localhost:3000/api/user
app.use('/api/user', UserAPIRouter);
//http://localhost:3000/api/product

app.use('/api/product', ProductAPIRouter);
//http://localhost:3000/cpanel/user

app.use('/cpanel/user', UsercPanelRouter);
//http://localhost:3000/cpanel/product

app.use('/cpanel/product', ProductcPanelRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// Database - Database
// table -collection
//row - Document
// column - field