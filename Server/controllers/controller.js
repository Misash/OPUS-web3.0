const express = require("express")
// const sql = require("../database/querys.js")

exports.index = (req, res)=>{
    console.log("index res")
    // example json
    const data = {
        "title" : "Hello world",
        "content": "nothing"
    }
    // res.json(data)

    res.sendFile(path.join(__dirname, "/index.html"))
}

exports.get_data = (req, res) =>{
    console.log("get_data res")
    res.render("get_data.ejs")
}