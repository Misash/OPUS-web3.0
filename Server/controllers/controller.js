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

exports.get_data = (req, res) =>{
    console.log("get_data res")
    res.render("get_data.ejs")
}

exports.send_post = (req, res) =>{
    console.log("sending post page")
    res.sendFile(path.join(__dirname, "../../Public/pages/post.html"))
}

exports.put_report = (req, res) =>{
    console.log(req.body)
    console.log("Reporting a post...")
    sql.report_post(req.body.id_post, req.body.id_type_report, req.body.comment)
}


exports.create_post = (req, res) =>{
    res.sendFile(path.join(__dirname, "../../Public/pages/createPost.html"))
}


exports.post_job = (req,res) =>{
   const data = req.body
    sql.save_org(data.Org_name,data.Org_website,data.country_region)
    sql.save_niches_org(data.Org_name,data.Org_website,data.niche_name)
    sql.save_salaries(data.min_salary,data.max_salary)
    sql.save_post(data)
}












