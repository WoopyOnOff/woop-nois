// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const pkgJson = require('./package.json');
const jwt    = require('jsonwebtoken');
const config = require('./server/config');

// Get public API routes
const publicTournaments = require('./server/routes/public/tournaments');
const publicPools = require('./server/routes/public/pools');
const authenticate = require('./server/routes/public/authenticate');

// Get private API routes
const privateTournaments = require('./server/routes/secured/tournaments');

const app = express();

mongoose.connect('mongodb://localhost:27017/local');     // connect to mongoDB database

secretIdToken = config.secret;


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api/tournaments', publicTournaments);
app.use('/api/tournaments', privateTournaments);
app.use('/api/pools', publicPools);
app.use('/api/authenticate', authenticate);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works ! Version '+pkgJson.version);
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
