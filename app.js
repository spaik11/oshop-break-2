const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const methodOverride = require('method-override');
require('./lib/passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users/userRoutes');
const adminRouter = require('./routes/admin/adminRoutes');
const productRouter = require('./routes/admin/products/productRouter');
const cartRouter = require('./routes/cart/cartRoutes');

const getAllCategories = require('./routes/admin/middleware/getAllCategories');
const cartTotal = require('./routes/cart/middleware/cartTotal');
const app = express();
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(`MongoDB Error: ${err}`));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true,
      cookie: { maxAge: 60000 }
    })
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.errors = req.flash('error');
  res.locals.message = req.flash('message');
  res.locals.success = req.flash('success');

  next();
});

app.use(getAllCategories);
app.use(cartTotal);

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

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
