const http = require("http");

const server = http.createServer((req, res) => {
  res.write("<h1>Hello Good morning everyone</h1>");

  res.write("<h2>Welcome to my project</h2>");

  res.end();
});

server.listen(5000);

console.log("server running .......");
