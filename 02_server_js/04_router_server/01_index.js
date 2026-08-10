import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {

    res.writeHead(200, {
        "content-type": "text/html"
    });

    if (req.url == "/") {

        const data = fs.readFileSync("01_index.html", "utf-8");
        res.end(data);

    }

    else if (req.url == "/about") {

        const data = fs.readFileSync("01_about.html", "utf-8");
        res.end(data);

    }

    else if (req.url == "/contact") {

        const data = fs.readFileSync("01_contact.html", "utf-8");
        res.end(data);

    }

    else if (req.url == "/service") {

        const data = fs.readFileSync("01_service.html", "utf-8");
        res.end(data);

    }

    else {

        res.writeHead(404, {
            "content-type": "text/html"
        });

        res.end("<h1>404 PAGE NOT FOUND</h1>");

    }

});

const port = 4000;

server.listen(port, (error) => {

    if (error) {
        return console.log(error.message);
    }

    console.log(`Routes Server running on port ${port}`);

});