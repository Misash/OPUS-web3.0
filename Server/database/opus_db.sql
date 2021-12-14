-- opus

CREATE DATABASE OPUS;

USE OPUS;

CREATE TABLE NICHES(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE COUNTRIES(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE REGIONS(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE ORGANIZATIONS(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    website VARCHAR(500) NOT NULL,
    description VARCHAR(500) NOT NULL,
    logo MEDIUMBLOB NOT NULL,
    id_country INT,
    id_region INT,
    PRIMARY KEY(id),
    FOREIGN KEY (id_country) REFERENCES COUNTRIES(id),
    FOREIGN KEY (id_region) REFERENCES REGIONS(id)  
);

CREATE TABLE NICHES_ORGANIZATION(
    id_niche INT NOT NULL,
    id_organization INT NOT NULL,
    PRIMARY KEY(id_niche, id_organization),
    FOREIGN KEY (id_niche) REFERENCES NICHES(id),
    FOREIGN KEY (id_organization) REFERENCES ORGANIZATIONS(id)
);

CREATE TABLE CATEGORIES(
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(20),
    PRIMARY KEY (id)
);

CREATE TABLE ROLES_TYPES(
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(20),
    PRIMARY KEY (id)
);

CREATE TABLE WORK_POLICIES(
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(20),
    PRIMARY KEY (id)
);

CREATE TABLE AMOUNTS(
    id INT NOT NULL AUTO_INCREMENT,
    value VARCHAR(10) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE SALARIES(
    id INT NOT NULL AUTO_INCREMENT,
    id_salary_min INT NOT NULL,
    id_salary_max INT NOT NULL,
    CHECK (id_salary_min <= id_salary_max),
    PRIMARY KEY(id),
    FOREIGN KEY(id_salary_min) REFERENCES AMOUNTS(id),
    FOREIGN KEY(id_salary_max) REFERENCES AMOUNTS(id)
);

CREATE TABLE POSTS(
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(100),
	description MEDIUMTEXT NOT NULL,
	start_date date NOT NULL,
	limit_date date,
	views INT NOT NUll,
	apply_url VARCHAR(500),
	apply_email VARCHAR(80),
	tag VARCHAR(140) NOT NULL,
	id_organization INT NOT NULL,
	id_category INT NOT NULL,
	id_role_type INT NOT NULL,
	id_work_policy INT NOT NULL,
	id_salary INT,
	PRIMARY KEY (id),
    FOREIGN KEY (id_organization) REFERENCES ORGANIZATIONS(id),
	FOREIGN KEY (id_category) REFERENCES CATEGORIES(id),
	FOREIGN KEY (id_role_type) REFERENCES ROLES_TYPES(id),
    FOREIGN KEY (id_work_policy) REFERENCES WORK_POLICIES(id),
    FOREIGN KEY (id_salary) REFERENCES SALARIES(id)
);  

CREATE TABLE REPORTS(
    id INT NOT NULL AUTO_INCREMENT,
    comment VARCHAR(400),
    id_post INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_post) REFERENCES POSTS(id)
);

CREATE TABLE TYPES(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NUll,
    PRIMARY KEY(id) 
);

CREATE TABLE REPORT_TYPE(
    id_report INT NOT NULL,
    id_type INT NOT NULL,
    PRIMARY KEY(id_report, id_type),
    FOREIGN KEY (id_report) REFERENCES REPORTS(id),
    FOREIGN KEY (id_type) REFERENCES TYPES(id)
);

--INSERT

-- DATA BASIC
--CATEGORIES

INSERT INTO CATEGORIES(name)
VALUES ("Design"),
       ("Engineering"),
       ("Product"),
       ("Community Engagement"),
       ("Research"),
       ("Business development"),
       ("Support"),
       ("operations"),
       ("Other");

--ROLES TYPES

INSERT INTO ROLES_TYPES(name)
VALUES ("Full Time"),
       ("Part Time"),
       ("Contract"),
       ("Freelance"),
       ("Intership");

--WORK POLICIES
INSERT INTO WORK_POLICIES(name)
VALUES ("Remote"),
       ("Flexible"),
       ("100% on-site");

--NICHES
INSERT INTO NICHES(name)
VALUES ("NFTs"),
       ("DAOs"),
       ("DeFi"),
       ("Layer 2"),
       ("Wallets"),
       ("Metaverse"),
       ("Oracles"),
       ("Exchanges"),
       ("Custody"),
       ("ERC20"),
       ("Smart-Contracts"),
       ("Stablecoins"),
       ("Developer-tools");

--COUNTRIES
INSERT INTO COUNTRIES(name)
VALUES ("USA"),
       ("Canada"),
       ("India"),
       ("China");

--REGIONS
INSERT INTO REGIONS(name)
VALUES ("Worldwide"),
       ("North America"),
       ("Western Europe"),
       ("Eastern Europe"),
       ("Asia"),
       ("Oceania"),
       ("Africa");

--AMOUNT 
INSERT INTO AMOUNTS (value)
VALUE (0),
(5000),
(10000),
(15000),
(20000),
(25000),
(30000),
(35000),
(40000),
(45000),
(50000),
(55000),
(60000),
(65000),
(70000),
(75000),
(80000),
(85000),
(90000),
(95000),
(100000),
(105000),
(110000),
(115000),
(120000),
(125000),
(130000),
(135000),
(140000),
(145000),
(150000),
(155000),
(160000),
(165000),
(170000),
(175000),
(180000),
(185000),
(190000),
(195000),
(200000),
(205000),
(210000),
(215000),
(220000),
(225000),
(230000),
(235000),
(240000),
(245000),
(250000),
(255000),
(260000),
(265000),
(270000),
(275000),
(280000),
(285000),
(290000),
(295000),
(300000),
(305000),
(310000),
(315000),
(320000),
(325000),
(330000),
(335000),
(340000),
(345000),
(350000),
(355000),
(360000),
(365000),
(370000),
(375000),
(380000),
(385000),
(390000),
(395000),
(400000);

-- TYPES
INSERT INTO TYPES(name)
VALUES ('Es discriminatorio u ofensivo'),
        ('Parece un empleo falso'),
        ('Es impreciso o incorrecto'),
        ('No es un empleo, es un anuncio'),
        ('Otro');

-- ORGANIZATIONS

INSERT INTO ORGANIZATIONS (name, website, description, id_country, id_region)
VALUES ('META', 'https://facebook.com', 'anything......', 1, NULL);

INSERT INTO NICHES_ORGANIZATION (id_niche, id_organization) 
VALUES (6, 1);

--SALARIES
INSERT INTO SALARIES (id_salary_min, id_salary_max) VALUES (1O, 12);

 -- POSTS

INSERT INTO POSTS (title, description, start_date, limit_date, views, apply_url, apply_email, tag, id_organization, id_salary, id_category, id_role_type, id_work_policy) 
VALUES ('CORE BLOCKCHAIN ENGINEER', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab sed consequatur fuga, porro itaque ut, cumque reprehenderit possimus natus atque perferendis consectetur at facilis! Facilis et quis excepturi non quod.',
 sysdate(), DATE_ADD(sysdate(), INTERVAL 3 WEEK), 0, 'https://facebook.com', NULL, 'Javascript,C++,SOLIDITY,RUST', (SELECT id FROM ORGANIZATIONS WHERE name = 'META' AND website = 'https://facebook.com'),
 (SELECT DISTINCT id FROM SALARIES WHERE id_salary_min = 10 AND id_salary_max = 12), 2, 3, 1);


-- guia para crear usuario 'OPUS-DB'
-- 1) Logearse como usuario root a mysql
-- 2) commandos:
-- CREATE USER 'opus-nodejs'@'localhost' IDENTIFIED BY 'password123';
-- FLUSH PRIVILEGES;
-- GRANT ALL ON *.* TO 'opus-nodejs'@'localhost';




-- SALARIES FORMAT
-- INSERT 
INSERT INTO SALARIES (id_salary_min, id_salary_max)
VALUES (?, ?)

--POST SELECT 

(SELECT MAX(id) FROM SALARIES)

SELECT p.id, p.title, p.description post_des, DATE_FORMAT(p.start_date, '%d/%m/%Y') start_date, p.limit_date, p.views, p.apply_url, p.apply_email, p.tag, p.id_organization, p.id_salary, p.id_category, p.id_role_type, p.id_work_policy,
  o.name, o.website, o.description org_des, o.id_country, o.id_region, 
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
  WHERE p.id = 1;
