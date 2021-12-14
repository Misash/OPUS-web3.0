const express = require("express")
const path = require("path")
const sql = require("../database/querys.js")

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

exports.send_post = async (req, res) =>{
    console.log("Sending post page with ID: ", req.params.id)
    
    let data_post = await sql.select_post(req.params.id)
    console.log(data_post)
    let types_report = await sql.select_types_report()
    console.log(types_report)
    sql.add_one_view_to_post(req.params.id)
    res.render('../templates/post.ejs', {data: data_post, types: types_report})
}

exports.put_report = (req, res) =>{
    console.log(req.body)
    console.log("Reporting a post...")
    sql.report_post(req.body.id_post, req.body.id_type_report, req.body.comment)
}