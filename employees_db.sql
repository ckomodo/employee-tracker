DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (

    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL,
    department_id INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    PRIMARY KEY (id)
);


INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Tech");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Director", 150000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Marketing Manager", 100000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Chief Tech Officer", 165000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Tech Intern", 15000.00, 3);

INSERT INTO employees (first_name, last_name, role_id) VALUES ("John", "Doe", 1);
INSERT INTO employees (first_name, last_name, role_id) VALUES ("Evans", "Brown", 2);
INSERT INTO employees (first_name, last_name, role_id) VALUES ("Mary", "Jane", 3);
INSERT INTO employees (first_name, last_name, role_id) VALUES ("Billy", "Bob", 4);

UPDATE employees SET manager_id = 3 WHERE id = 4;