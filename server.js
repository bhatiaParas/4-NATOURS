const mongoose = require('mongoose');
const dotenv = require('dotenv');

// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import {app} from './app.js';

process.on('uncaughtException', (err) => {
  console.log('UuncaughtException, SHUTTING DOWN');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection succesful!');
  });

// console.log(process.env);

// Schema

//In the next video we gonna then use model here in order to create very first tour document
//lec-86
//This is just for testing we dont really need this
// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: 997,
// });

// testTour
//   .save()
//   .then((doc) => {
//     //this will save the document in the data base..this save will then return a promise
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR', err);
//   });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION, SHUTTING DOWN');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
  // process.exit(1);
});
