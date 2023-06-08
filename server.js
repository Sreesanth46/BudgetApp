const http = require('http');
const app = require('./app');
const server = http.createServer(app)
const db = require('./models')

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
