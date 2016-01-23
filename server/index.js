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

app.use(bodyParser.json());
app.use('/api', contacts);
app.use(express.static('public'));
app.get('*', (req, res) => {
  console.log('req.url', req.url);
  res.render(req.url.slice(1) || 'index');
});

mongoose.Promise = bluebird;

export default app;
