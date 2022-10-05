const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database("./blog.db",sqlite.OPEN_READWRITE,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("connected to db successfully");
});

module.exports = db;