const mongoose  = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Url = require('../models/url');

Url.collection.drop();
