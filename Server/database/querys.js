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


exports.save_salaries = (min_salary ,max_salary) =>{
  if(min_salary != '0' || max_salary !='0')
  {
    var sql = 'INSERT INTO SALARIES (id_salary_min, id_salary_max)\
     VALUES ((select id from AMOUNTS where value = ?), \
     (select id from AMOUNTS where value = ?));'
    database.query(sql,[min_salary,max_salary],(err,res) =>{
      console.log(err)
    })
  }
}


exports.save_post = (d )=>
{
  var apply_email
  var apply_url 
  if(d.apply_link.includes('@')){
    apply_email = d.apply_link
    apply_url = null
  }

  var values
  var sql 
  
  if(d.max_salary !='0' || d.min_salary != '0')
  {
    console.log("with salary")
    sql = "INSERT INTO POSTS \
    (title, description, start_date, limit_date, views, apply_url, apply_email, tag, id_organization, id_salary, id_category, id_role_type, id_work_policy) \
    VALUES (?,?,sysdate(),DATE_ADD(sysdate(), INTERVAL 3 WEEK),0,?,?,?,\
    (SELECT id FROM ORGANIZATIONS WHERE name = ? AND website = ? ),\
    (SELECT MAX(id) FROM SALARIES where id_salary_min = ? AND id_salary_max = ? ),(SELECT id FROM CATEGORIES WHERE name = ?) ,(SELECT id FROM ROLES_TYPES WHERE name = ?),(SELECT id FROM WORK_POLICIES WHERE name = ?))"

    values = [d.title,d.description,apply_url,apply_email,d.tag,d.Org_name,d.Org_website,d.min_salary,d.max_salary,d.category,d.role_type,d.work_policy]
    database.query(sql,values,(err,res) =>{
      console.log(err)
    })
 
  }else{
    console.log("with no salary")
    sql = "INSERT INTO POSTS \
    (title, description, start_date, limit_date, views, apply_url, apply_email, tag, id_organization, id_salary, id_category, id_role_type, id_work_policy) \
    VALUES (?,?,sysdate(),DATE_ADD(sysdate(), INTERVAL 3 WEEK),0,?,?,?,\
    (SELECT id FROM ORGANIZATIONS WHERE name = ? AND website = ? ),null,(SELECT id FROM CATEGORIES WHERE name = ?) ,(SELECT id FROM ROLES_TYPES WHERE name = ?),(SELECT id FROM WORK_POLICIES WHERE name = ?))"

    values = [d.title,d.description,apply_url,apply_email,d.tag,d.Org_name,d.Org_website,d.category,d.role_type,d.work_policy]
    database.query(sql,values,(err,res) =>{
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