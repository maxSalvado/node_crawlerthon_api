const http = require('http');
const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors'); // Import the cors middleware

const hostname = '0.0.0.0';
const port = 3030;

const app = express();

// Enable CORS for all routes
app.use(cors());

// Use the routes from routes.js
app.use('/', routes);
const server = http.createServer(app);

// Start the server and listen on the specified port and hostname
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
