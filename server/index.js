import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import contacts from './controllers/contacts';

mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/fullstackjs');

const app = express();

app.use(bodyParser.json({
  type: 'application/json',
  limit: '50mb'
}));

app.use('/api', contacts);

app.use(express.static('public'));
app.listen(3000, () => console.log('listening port 3000'));
