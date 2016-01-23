
import express from 'express';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import bodyParser from 'body-parser';

mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/fullstackjs');

import contacts from './controllers/contacts';

const app = express();

app.use(bodyParser.json());

app.use('/api', contacts);

app.use(express.static('public'));
app.listen(3000, () => console.log('listening port 3000'));
