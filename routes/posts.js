const express = require('express');
const router = express.Router();
const db = require("../database/db")
const { body, validationResult } = require('express-validator');
const { json } = require('body-parser');
let sql;


//Create a Post
router.post("/createPost",[
    body('title').isLength({min:3}),
    body('body').isLength({min:5})
],(req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const {title,body,category} = req.body;
        sql = "INSERT INTO blog(title,body,category) VALUES(?,?,?)";
        db.run(sql,[title,body,category],(err)=>{
            if(err){
                return res.json({
                    status:300,
                    sucess:false,
                    error:err
                })
            }
            console.log("successful input",title,body,category)
        })
        return res.json({
            status:200,
            sucess:true
        })
    } catch (error) {
        return res.json({
            status:400,
            success:false
        })
    }
})


//Get all the Posts
router.get("/getAllPosts",(req,res)=>{
    sql = "SELECT * FROM blog";
    try {
        db.all(sql,[],(err,rows)=>{
            if(err){
                res.json({
                    status:300,
                    sucess:false,
                    error:err
                })
            }
            if(rows.length<1){
                return res.json({
                    status:300,
                    sucess:false,
                    error:"No match"
                })
            }
            const page = req.query.page;
            const limit = req.query.limit;

            const startIndex = (page-1)*limit;
            const lastIndex = page*limit;
            const resultPosts = rows.slice(startIndex,lastIndex);
            
            return res.json({
                status:200,
                data:resultPosts,
                sucess:true
            })
        })

    } catch (error) {
        console.log(error);
        return res.json({
            status:400,
            success:false
        })
    }
})
//Get a post by its id:, where body starts with a or A
router.get("/getPost/:id",(req,res)=>{

    sql = "SELECT [BODY] FROM blog WHERE id=?"
    try {
        db.all(sql,[req.params.id],(err,rows)=>{
            if(err){
                res.json({
                    status:300,
                    sucess:false,
                    error:err
                })
            }
            if(rows.length<1){
                return res.json({
                    status:300,
                    sucess:false,
                    error:"No match"
                })
            }
            const wordsArray = JSON.stringify(rows).split(" ");
            var result = wordsArray.filter((word)=> word.toLowerCase().indexOf("a")==0);
            
            return res.json({
                status:200,
                data:result,
                sucess:true
            })
        })

    } catch (error) {
        console.log(error);
        return res.json({
            status:400,
            success:false
        })
    }
})


//Get a post by Id and update it:
router.put("/getPostid/:id",(req,res)=>{
    sql = "SELECT [BODY] FROM blog WHERE id=?"
    db.all(sql,[req.params.id],(err,rows)=>{
        if(err){
            res.json({
                status:300,
                sucess:false,
                error:err
            })
          }    
            let data = rows[0].BODY;
            let  wordsArray = data.split(" ");
            for(let i=0;i<wordsArray.length;i++){
                if(wordsArray[i].toLowerCase().indexOf('a')==0) {
                    wordsArray[i] = wordsArray[i].substring(0,wordsArray[i].length-3) + "***";
                }
            }    
             let result = wordsArray.join(" ");
             sql = "UPDATE blog SET BODY=? WHERE id=?";
             db.run(sql,[ result,req.params.id],(req,res)=>{
                if(err){
                    res.json({
                        status:300,
                        sucess:false,
                        error:err
                    })
                  } 
             })
                return res.json({
                    status:200,
                    data:result,
                    sucess:true
                })
            
             })
})

module.exports = router;