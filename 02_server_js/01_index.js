

const http = require("http");

const server =http.createServer((req,res)=>
{
    res.write("hello everyone my name is gnandipsinh i am student")
    res.end();
});

server.listen(3000);

console.log("server running ........")