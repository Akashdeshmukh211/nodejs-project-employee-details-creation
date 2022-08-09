const mongoose = require("mongoose")
var express = require('express');
const bodyParser = require('body-parser') 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

const EmployeeController = require("../controllers/employeeController")
/* GET home page. */
router.get('/', EmployeeController.employeeform);
//Router for update and insert employees details
router.post('/',EmployeeController.insertEmployeesDetailsAll );


//Show all employees Details route
router.get('/employeesList', EmployeeController.showEmployees);
//Edit employee Route
// router.get("/:id", EmployeeController.edtiEmployees )
//Delete Employee details route
router.get("/delete/:id", EmployeeController.deleteEmployee )



module.exports = router;