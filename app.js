const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db",
});

connection.connect();

function startQues() {
  inquirer
    .prompt({
      type: "list",
      name: "reasons",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add an employee",
        "Add a role",
        "Add a department",
        "Update an employee's role",
        "Exit",
      ],
    })
    .then(function (answer) {
      if (answer.reasons === "View All Employees") {
        viewAllEmployees();
      } else if (answer.reasons === "View All Roles") {
        viewAllRoles();
      } else if (answer.reasons === "View All Departments") {
        viewAllDepartments();
      } else if (answer.reasons === "Add an employee") {
        addAnEmployee();
      } else if (answer.reasons === "Add a role") {
        addARole();
      } else if (answer.reasons === "Add a department") {
        addADepartment();
      } else if (answer.reasons === "Update an employee's role") {
        updateEmployeeRole();
      } else {
        connection.end();
      }
    });
}

function viewAllEmployees() {
  connection.query("SELECT * FROM employees", function (err, results) {
    if (err) throw err;
    console.table(results);
    startQues();
  });
}
function viewAllRoles() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    console.table(results);
    startQues();
  });
}
//done
function viewAllDepartments() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    startQues();
  });
}
function addAnEmployee() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    console.table(results);
    startQues();
  });
}
function addARole() {}
function addADepartment() {}
function updateEmployeeRole() {}

startQues();
