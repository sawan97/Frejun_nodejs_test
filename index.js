const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./database/db");

app.use(bodyParser.json());

//routes
app.use("/api",require("./routes/posts"));

app.listen(port,()=>{
    console.log("server is listening on port:",port)
})