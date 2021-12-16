const database = require("./connection.js")
const util = require("util")

const query = util.promisify(database.query).bind(database)

exports.report_post = (id_post, id_type_report, comment) =>
{
  if(comment == '')
    comment = null
  query("INSERT INTO REPORTS (comment, id_post) VAlUES (?, ?)", [comment, id_post])

  query("INSERT INTO REPORT_TYPE (id_report, id_type) VALUES ((SELECT MAX(id) FROM REPORTS), ?)", [id_type_report])
}

exports.select_post = async (id) =>
{
  return (await query(`SELECT p.id, p.title, p.description post_des, DATE_FORMAT(p.start_date, '%d/%m/%Y') start_date, p.limit_date, p.views, p.apply_url, p.apply_email, p.tag, p.id_organization, p.id_salary, p.id_category, p.id_role_type, p.id_work_policy,
  o.name, o.website, o.id_country, o.id_region, 
  n.name niche_name,
  co.name country_name,
  re.name region_name,
  a_min.value min_salary,
  a_max.value max_salary,
  ca.name category_name,
  ro.name role_name,
  w.name work_name
  FROM POSTS p
  JOIN ORGANIZATIONS o ON (p.id_organization = o.id) 
  JOIN NICHES_ORGANIZATION n_o ON (n_o.id_organization = o.id) 
  JOIN NICHES n ON (n_o.id_niche = n.id)  
  LEFT JOIN COUNTRIES co ON (co.id = o.id_country) 
  LEFT JOIN REGIONS re ON (re.id = o.id_region) 
  LEFT JOIN SALARIES s ON (s.id = p.id_salary)
  LEFT JOIN AMOUNTS a_min ON (a_min.id = s.id_salary_min)
  LEFT JOIN AMOUNTS a_max ON (a_max.id = s.id_salary_max)
  JOIN CATEGORIES ca ON (ca.id = p.id_category)
  JOIN ROLES_TYPES ro ON (ro.id = p.id_role_type)
  JOIN WORK_POLICIES w ON (w.id = p.id_work_policy)
  WHERE p.id = ?`, [id]))[0]
}

exports.select_types_report = async () =>{
  return await query("SELECT * FROM TYPES")
}

exports.add_one_view_to_post = (id) =>{
  query("UPDATE POSTS SET views = views +1 WHERE id=?", [id, id])
}

exports.save_org = (name,website,country_region) =>{
  var sql 
  values = [name,website,country_region]
  if(country_region == 'USA' || country_region == 'Canada' || country_region == 'India' || country_region == 'China' ){
    sql = "INSERT INTO ORGANIZATIONS (name,website,id_country) VALUES (?,?,(select id from COUNTRIES where name = ?))"
  }else{
    sql = "INSERT INTO ORGANIZATIONS (name,website,id_region) VALUES (?,?,(select id from REGIONS where name = ?))"
  }
  query(sql,values,(err,res) =>{
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
          query(sql,[niche_name[i],org_name,org_website],(err,res) =>{
            console.log(err)
          })
        }
    }else{
      console.log(niche_name)
      query(sql,[niche_name,org_name,org_website],(err,res) =>{
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
    query(sql,[min_salary,max_salary],(err,res) =>{
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
    query(sql,values,(err,res) =>{
      console.log(err)
    })
 
  }else{
    console.log("with no salary")
    sql = "INSERT INTO POSTS \
    (title, description, start_date, limit_date, views, apply_url, apply_email, tag, id_organization, id_salary, id_category, id_role_type, id_work_policy) \
    VALUES (?,?,sysdate(),DATE_ADD(sysdate(), INTERVAL 3 WEEK),0,?,?,?,\
    (SELECT id FROM ORGANIZATIONS WHERE name = ? AND website = ? ),null,(SELECT id FROM CATEGORIES WHERE name = ?) ,(SELECT id FROM ROLES_TYPES WHERE name = ?),(SELECT id FROM WORK_POLICIES WHERE name = ?))"

    values = [d.title,d.description,apply_url,apply_email,d.tag,d.Org_name,d.Org_website,d.category,d.role_type,d.work_policy]
    query(sql,values,(err,res) =>{
      console.log(err)
    })
  }

}


exports.save_user = (email,name,frecuency) =>{
  if(email != '' && name !='' && frecuency !='')
  {
    sql = "INSERT INTO USERS (email,name,id_frecuency) VALUES (?,?,(select id from FRECUENCY where name = ?))"
    values = [email,name,frecuency]
    query(sql,values,(err,res) =>{
      console.log(err)
    })
  }
  
}

exports.get_user = async () =>{
  return await query("SELECT * FROM USERS")
}

exports.get_id_frecuency = async (id) =>{
  return await query("SELECT name FROM FRECUENCY where id = ?",[id])
}

exports.getPosts= async ()=>{
  return await query('SELECT id,title,tag FROM POSTS')
}

exports.getPostsByNiche= async (niche)=>{
  
  return await query
  (
    `
    SELECT p.id, p.title , p.tag
    FROM POSTS p INNER JOIN ORGANIZATIONS o INNER JOIN NICHES_ORGANIZATION noo 
    ON p.id_organization = o.id AND o.id = noo.id_organization 
    AND  noo.id_niche = (select id from NICHES where name = ?)
    `,[niche]
  )
  

}