import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  fs.readFile("./01_index.html", (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(404);
      res.end("Not Found");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });

      res.end(data);
    }
  });
});

const port = 3000;

server.listen(port, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log(`Server is running ${port}`);
});

