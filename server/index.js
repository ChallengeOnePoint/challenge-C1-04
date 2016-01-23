import express from 'express';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import contacts from './controllers/contacts';

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
