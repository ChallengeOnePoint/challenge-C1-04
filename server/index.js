import express from 'express';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import contacts from './controllers/contacts';

const app = express();

app.set('view engine', 'jade');

app.get('/', (req, res) => res.render('index'));

app.use(bodyParser.json());
app.use('/api', contacts);
app.use(express.static('public'));

mongoose.Promise = bluebird;

export default app;
