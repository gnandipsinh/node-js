import http from "http";

import fs from "fs";

const server =http.createserver((req,res)=>
{
    res.writeHead(200,{
        "const-type":"text/html"
    });

    const data=fs.readfilesync("index.html","utf-8");

    res.end(data);
});

const port =3000;

server.listen(port,(error)=>
{
    if(error)
    {

        return console.log(error.message);
    }

    console.log(`file server running in ${port}`);
});



