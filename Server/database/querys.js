const database = require("./connection.js")

exports.report_post = (id_post, id_type_report, comment) =>
{
  if(comment == '')
    comment = null
  database.query("INSERT INTO REPORTS (comment, id_post) VAlUES (?, ?)", [comment, id_post], (err, res) =>{
    if(err){
      console.log("ERROR_REPORT_POST", err)
      return;
    }
  })

  database.query("INSERT INTO REPORT_TYPE (id_report, id_type) VALUES ((SELECT MAX(id) FROM REPORTS), ?)", [id_type_report])
}


exports.save_org = (name,website,country_region) =>{
  var sql 
  values = [name,website,country_region]
  if(country_region == 'USA' || country_region == 'Canada' || country_region == 'India' || country_region == 'China' ){
    sql = "INSERT INTO ORGANIZATIONS (name,website,id_country) VALUES (?,?,(select id from COUNTRIES where name = ?))"
  }else{
    sql = "INSERT INTO ORGANIZATIONS (name,website,id_region) VALUES (?,?,(select id from REGIONS where name = ?))"
  }
  database.query(sql,values,(err,res) =>{
    console.log(err)
  })
}

exports.save_niches_org = (org_name,org_website,niche_name)  =>{

  var sql = "INSERT INTO NICHES_ORGANIZATION (id_niche,id_organization) \
  VALUES ((select id from NICHES where name = ?),(select DISTINCT id from ORGANIZATIONS where name = ? and website = ?))"
    if(niche_name.constructor === Array){
        for(var i=0;i<niche_name.length;i++)
        {
          console.log(niche_name[i])
          database.query(sql,[niche_name[i],org_name,org_website],(err,res) =>{
            console.log(err)
          })
        }
    }else{
      console.log(niche_name)
      database.query(sql,[niche_name,org_name,org_website],(err,res) =>{
        console.log(err)
      })
    }
     
}




// codigo de ejemplo para las consultas
const Tutorial = function(tutorial) {
    
  };
  
  Tutorial.create = (newTutorial, result) => {
    sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
      result(null, { id: res.insertId, ...newTutorial });
    });
  };
  
  Tutorial.findById = (id, result) => {
    sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found tutorial: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Tutorial.getAll = (title, result) => {
    let query = "SELECT * FROM tutorials";
  
    if (title) {
      query += ` WHERE title LIKE '%${title}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("tutorials: ", res);
      result(null, res);
    });
  };
  
  Tutorial.getAllPublished = result => {
    sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("tutorials: ", res);
      result(null, res);
    });
  };
  
  Tutorial.updateById = (id, tutorial, result) => {
    sql.query(
      "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
      [tutorial.title, tutorial.description, tutorial.published, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated tutorial: ", { id: id, ...tutorial });
        result(null, { id: id, ...tutorial });
      }
    );
  };
  
  Tutorial.remove = (id, result) => {
    sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted tutorial with id: ", id);
      result(null, res);
    });
  };
  
  Tutorial.removeAll = result => {
    sql.query("DELETE FROM tutorials", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} tutorials`);
      result(null, res);
    });
  };
  
  // module.exports = Tutorial;