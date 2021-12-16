const express = require("express")
const path = require("path")
const sql = require("../database/querys.js")
const nodemailer = require('nodemailer');

exports.index = async (req, res)=>{

    console.log("Index visit")
    posts = await sql.getPosts()
    console.log(posts)
    res.render("../templates/index.ejs", {lists: posts})
}

//--FILTER BY NICHE

exports.niche = async (req, res) =>{
    console.log("Filter by niche:", req.params.niche)
    let niche = req.params.niche
    let data = await sql.getPostsByNiche(niche)
    res.render("../templates/index.ejs", {lists: data})
}

// --

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


exports.create_user = (req,res) =>{
    const data = req.body
    console.log("suscribe user")
    sql.save_user(data.email,data.name,data.frecuency)
}


exports.send_user = async (req, res) =>{
    let data = await sql.get_user()
    var now = new Date();

    for(var i= 0; i < data.length; i++)
    {
       let frecuency = await sql.get_id_frecuency(data[i].id_frecuency)
       var user_email = data[i].email
        //send email daily
       if(frecuency[0].name == 'daily' && now.getDay() != 0)
       {
            send_mail_to(user_email)
       }else
       {  //send email weekly
                send_mail_to(user_email)
       }
    }
}


function send_mail_to(mail){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'spacialWeb3@gmail.com',
            pass:'opus1234'
        }
    });
    let mailOptions ={
        from:'OPUS',
        to:mail,
        subject:'Testing and testing',
        text:'Welcome to OPUS',
    };
    transporter.sendMail(mailOptions,function(err, data){
        if(err){
            console.log('Error Occurs: ',err);
        }else{
            console.log('Email sent!!!');
        }
    });
}