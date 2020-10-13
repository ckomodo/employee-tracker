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

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // readDb();
  startQues();
});

function readDb() {
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;
    console.table(data);
  });
  connection.query("SELECT * FROM employees", function (err, data) {
    if (err) throw err;
    console.table(data);
  });
}

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
  });
  startQues();
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
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "text",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        type: "text",
        message: "What is the employee's last name?",
      },
      {
        name: "role",
        type: "text",
        message: "What is the numerical code of the employee's role?",
      },
      {
        name: "manager_id",
        type: "text",
        message: "What is the manager ID of this employee?",
      },
    ])
    .then(function ({ first_name, last_name, role, manager_id }) {
      connection.query("INSERT INTO employees SET ?", {
        first_name: first_name,
        last_name: last_name,
        role_id: role,
        manager_id: manager_id,
      });

      {
        if (err) throw err;
        console.log("employee added");
      }
      startQues();
    });
}

function addARole (){
  inquirer.prompt([
    {
      name: "title",
      type: "text",
      message: "What is the title of this role?",
    },
    {
      name: "salary",
      type: "number",
      message: "What is this role's salary?",
    },
    {
      name: "department",
      type: "text",
      message: "What department is this role in?",
    },
]).then(function({title, salary, department}){
connection.query("INSERT INTO role SET ?", {
  title: title,
  salary: salary,
  department_id: department
})
{
  if (err) throw err
  console.log("role added");
}
startQues();
})
}

function addADepartment(){
  inquirer.prompt({
    name: "departmentName",
    type: "text",
    message: "What is the new department?",
  }).then(function({departmentName}){
    connection.query("INSERT INTO department SET ?", {
      name: departmentName
    })
    startQues();
  })
}