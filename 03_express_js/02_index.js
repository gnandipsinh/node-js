

import express from "express";


const app =express();

app.get("/",(req,res)=>
{
    res.send("hello good morning");

});


const port=3000;

app.listen(port,(err)=>
{
    if(err)
    {
        return console.log("err");
    }


    console.log(`server running on port ${port}`);
});