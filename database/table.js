const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database("./blog.db",sqlite.OPEN_READWRITE,(err)=>{
    if(err){
        console.log(err);
    }
});

const sql = `CREATE TABLE blog(ID INTEGER PRIMARY KEY,TITLE,BODY,CATEGORY)`;
db.run(sql);