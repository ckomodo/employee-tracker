const inquirer = require("inquirer");
const mysql = require("mysql");
// require("console.table");

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
  startQues();
});

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
        "Fire an employee",
        "Delete a department",
        "Delete a role",
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
      } else if (answer.reasons === "Fire an employee") {
        deleteEmployee();
      } else if (answer.reasons === "Delete a department") {
        deleteDepartment();
      } else if (answer.reasons === "Delete a role") {
        deleteRole();
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
    .then(function ({ first_name, last_name, role, manager_id }, err) {
      connection.query("INSERT INTO employees SET ?", {
        first_name: first_name,
        last_name: last_name,
        role_id: role,
        manager_id: manager_id,
      });

      {
        if (err) throw err;

        console.log("===============");
        console.log("successfully added employee");
        console.log("===============");
      }
      startQues();
    });
}

function addARole() {
  connection.query("SELECT * FROM department", function (err, data) {
    if (err) throw err;

    let depArr = data.map(function (dep) {
      return {
        name: dep.name,
        value: dep.id,
      };
    });

    inquirer
      .prompt([
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
          type: "list",
          message: "What department is this role in?",
          choices: depArr,
        },
      ])
      .then(function ({ title, salary, department }, err) {
        connection.query("INSERT INTO role SET ?", {
          title: title,
          salary: salary,
          department_id: department,
        });
        {
          if (err) throw err;
          console.log("===============");
          console.log("successfully added role");
          console.log("===============");
        }
        startQues();
      });
  });
}

function addADepartment() {
  inquirer
    .prompt({
      name: "departmentName",
      type: "text",
      message: "What is the new department?",
    })
    .then(function ({ departmentName }, err) {
      connection.query("INSERT INTO department SET ?", {
        name: departmentName,
      });
      {
        if (err) throw err;
        console.log("===============");
        console.log("successfully added department");
        console.log("===============");
      }
      startQues();
    });
}

function updateEmployeeRole() {
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;

    let newRoleArr = data.map(function (role) {
      return {
        name: role.title,
        value: role.id,
      };
    });

    inquirer
      .prompt([
        {
          name: "role",
          type: "list",
          message: "What role would you like to update?",
          choices: newRoleArr,
        },
        {
          name: "newRole",
          type: "input",
          message: "What role would you like to update it to?",
        },
        // {
        //   name: "salary",
        //   type: "input",
        //   message: "What's the salary for this role?",
        // },
      ])
      .then(function ({ newRole }, err) {
        connection.query("INSERT INTO role SET ?", {
          title: newRole,
        });
        {
          if (err) throw err;
          console.log("===============");
          console.log("successfully added new role");
          console.log("===============");
        }
        startQues();
      });
  });
}

function deleteEmployee() {
  connection.query("SELECT * FROM employees", function (err, data) {
    if (err) throw err;

    let newEmployeeArr = data.map(function (employee) {
      return {
        name: employee.first_name + employee.last_name,
        value: employee.id,
      };
    });

    inquirer
      .prompt({
        name: "employee",
        type: "list",
        message: "Which employee would you like to fire?",
        choices: newEmployeeArr,
      })
      .then(function ({ employee }, err) {
        connection.query(
          "DELETE FROM employees WHERE id = ?",
          [employee],
          function (err, data) {
            if (err) throw err;
            console.log("===============");
            console.log("successfully fired");
            console.log("===============");
            startQues();
          }
        );
      });
  });
}

function deleteDepartment() {
  connection.query("SELECT * FROM department", function (err, data) {
    if (err) throw err;

    let deleteDeptArr = data.map(function (department) {
      return {
        name: department.name,
        value: department.id
      };
    });

    inquirer
      .prompt({
        name: "department",
        type: "list",
        message: "Which employee would you like to delete?",
        choices: deleteDeptArr,
      })
      .then(function ({ department }, err) {
        connection.query(
          "DELETE FROM department WHERE id = ?",
          [department],
          function (err, data) {
            if (err) throw err;
            console.log("===============");
            console.log("department successfully deleted");
            console.log("===============");
            startQues();
          }
        );
      });
  });
}

function deleteRole() {
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;

    let deleteRoleArr = data.map(function (role) {
      return {
        name: role.title,
        value: role.id
      };
    });

    inquirer
      .prompt({
        name: "role",
        type: "list",
        message: "Which role would you like to delete?",
        choices: deleteRoleArr,
      })
      .then(function ({ role }, err) {
        connection.query(
          "DELETE FROM role WHERE id = ?",
          [role],
          function (err, data) {
            if (err) throw err;
            console.log("===============");
            console.log("role successfully deleted");
            console.log("===============");
            startQues();
          }
        );
      });
  });
}