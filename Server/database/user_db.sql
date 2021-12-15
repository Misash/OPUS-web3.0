
--create USER 

CREATE TABLE FRECUENCY(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(15) NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE USERS(
    email VARCHAR(30) NOT NULL,
    name VARCHAR(10) NOT NULL,
    id_frecuency INT NOT NUll,
    PRIMARY KEY (email),
    FOREIGN KEY (id_frecuency) REFERENCES FRECUENCY(id)
);

--INSERT VALUES



INSERT INTO FRECUENCY(name)
VALUES ("daily"),
       ("weekly");
