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
  JOIN SALARIES s ON (s.id = p.id_salary)
  JOIN AMOUNTS a_min ON (a_min.id = s.id_salary_min)
  JOIN AMOUNTS a_max ON (a_max.id = s.id_salary_max)
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