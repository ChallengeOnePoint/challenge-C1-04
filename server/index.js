
import express from 'express';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/fullstackjs');

import contacts from './controllers/contacts';

const app = express();

app.use('/api', contacts);

app.use(express.static('public'));
app.listen(3000, () => console.log('listening port 3000'));
