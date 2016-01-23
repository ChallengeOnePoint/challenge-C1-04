import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import contacts from './controllers/contacts';

mongoose.Promise = bluebird;
//AIzaSyBEwzAmJk2iKrC-kS_xkFfaw7YbFYdeg2A
const app = express();

app.set('view engine', 'jade');
app.get('/', (req, res) => res.render('index'));

app.use(bodyParser.json({
  type: 'application/json',
  limit: '50mb'
}));
app.use('/api', contacts);
app.use(express.static('public'));

// uncaugh exceptions handler
app.use(function logErrors(err, req, res, next) {
  console.error(err.message, err.stack);

  res.status(500).json({error: 'backend error'});
  
  next();
});

mongoose.Promise = bluebird;

export default app;
