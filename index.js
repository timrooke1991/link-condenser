const express       = require('express');
const app           = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
mongoose.Promise = require('bluebird');


const routes            = require('./config/routes');
const customResponses   = require('./lib/customResponses');
const errorHandler      = require('./lib/errorHandler');

const { dbURI, port } = require('./config/environment');
mongoose.connect(dbURI);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);
app.use(express.static(`${__dirname}/src`));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(customResponses);
app.use(routes);
app.use(errorHandler);

// app.get('/*', (req, res) => res.sendFile(`${__dirname}/views/index`));

app.listen(port, () => console.log(`Express has started on port: ${port}`));

module.exports = app;
