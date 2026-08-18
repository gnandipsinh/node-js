import express from "express";

const app = express();

app.get("/", (req, res) => {

    res.send(
        "Hello from my new server"
    );

});

app.get("/about", (req, res) => {

    res.send({
        message: "Hello from my new about server"
    });

});

app.get("/service", (req, res) => {

    res.send({
        message: "Hello from my new service server"
    });

});

app.get("/student",(req,res)=>{
    res.send({
        name:"Gohil Gnandipsinh",
        age:18,

    })
});


app.use("/student",(req,res,next)=>{

    res.json(person);

    next();

})



const port = 3000;

app.listen(port, (err) => {

    if (err) {
        return console.log(err);
    }

    console.log(`Server running on port ${port}`);

});