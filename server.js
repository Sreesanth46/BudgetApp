const http = require('http');
const app = require('./app');
const server = http.createServer(app)
const db = require('./models')
require('dotenv').config()

const port = process.env.PORT || 9080;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
