const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();

app.set('view engine', 'pug'); // UI
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARE

//Serving static files

// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

//SET SECURITY HTTP HEADER

app.use(helmet());

// Development Logging

if (process.env.NODE_ENV === 'development') {
  //This code enables HTTP request logging with morgan in 'dev' mode only when the application is running in a development environment, as specified by the NODE_ENV variable.
  app.use(morgan('dev'));
}

// Limit Requests from same API

const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per windowMs
  windowMs: 60 * 60 * 1000, // 60 minutes
  message: 'Too many requests from this IP, please try again in 60 minutes.',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body

app.use(express.json({ limit: '10kb' })); //middleware

// Data Sanitization against NOSQL query injection
app.use(mongoSanitize()); // email- {"$gt": ""} or password pata ho to hmara login ho jata tha par ab ye mongosanitize $ sign ko hata deta ha ab login nhi ho payega

// Data Sanitization against XSS (cross-site scripting) attacks
app.use(xss()); // html code ko change karta ha

// prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ], // fields in the request body that should not be sanitized
  }),
);

// Test Middleware

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter); //middleware--development ko easier kar dete ha and fast bi
app.use('/api/v1/users', userRouter); //middleware
app.use('/api/v1/reviews', reviewRouter);

//middleware hamesha order me chalta ha..top to bottom..or hamesha app.all wala neeche hi likhna ha

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server!`)); // we actuallly need dto pass an error into the next..next function receives an argumentno matter what it it express automatically knows that there was an err
});

app.use(globalErrorHandler);

// 4) START THE SERVER

module.exports = app;
