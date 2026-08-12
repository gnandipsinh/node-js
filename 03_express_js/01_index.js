

import express from "express";
import { error } from "node:console";

const app =express();

app.get("/",(req,res)=>
{
    res.send("hello my name is gohil gnandipsinh");
});

const port=5000;


app.listen(port,(err)=>
{
    if(err)
    {
        return console.log(error);
    }

    console.log(`server running on port ${port}.....`);
});

