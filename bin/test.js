#!/bin/env node

import mongoose from 'mongoose';
import Mocha from 'Mocha';
import fs from 'fs';
import path from 'path';
import chai from 'chai';

const TEST_DIR = `${__dirname}/../test`;
const mocha    = new Mocha();

global.expect = chai.expect;

mongoose.connect(`mongodb://localhost/address-book-${Date.now()}`);

process.on("exit", () => mongoose.connection.db.dropDatabase());

fs.readdir(TEST_DIR, (err, files) => {
  if (err) throw err;

  files
    .filter(file => file.substr(-3) === '.js')
    .forEach(file => mocha.addFile(path.resolve(TEST_DIR, file)));

  mocha.run(failures => process.exit(failures));
});
