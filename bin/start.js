#!/bin/env node

import mongoose from 'mongoose';
import server from '../server';

mongoose.connect('mongodb://localhost/address-book');

server.listen(3000, () => console.log('Listening: port 3000'));
