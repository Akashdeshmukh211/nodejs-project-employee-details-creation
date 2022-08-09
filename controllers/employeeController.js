const mongoose = require("mongoose");
const employees = mongoose.model("employee");

// //Update Employees Details
// function UpdateEmployeesDetails(req, res, next) {
//   console.log(req.body);
//   employees.findByIdAndUpdate(
//     { _id: req.body._id },
//     req.body,
//     { new: true },
//     (err, doc) => {
//       if (!err) {
//         res.redirect("/employee/employeesList");
//       } else {
//         console.log("Error :", err);
//       }
//     }
//   );
// }

//InsertEmployees Details
function insertEmployeesDetails(req, res, next) {
  const employeeDetails = new employees();
  employeeDetails.fullName = req.body.fullName;
  employeeDetails.email = req.body.email;
  employeeDetails.phone = req.body.phone;

  if (req.body._id == " ") {
    employeeDetails
      .save()
      .then(data => {
        return res.json({
          status: true,
          data: {},
          message: "Employee Details Added"
        });
      })
      .catch(err => {
        return res.json({
          status: false,
          data: err,
          message: "Something Went Wrong..!"
        });
      });
  } else {
    console.log(req.body._id);
    employees
      .findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true })
      .then(() => {
        return res.json({
          status: true,
          data: {},
          message: "Employee Details edited"
        });
      })
      .catch(() => {
        return res.json({
          status: true,
          data: {},
          message: "Employee Details not edited"
        });
      });
  }
}

exports.insertEmployeesDetailsAll = (req, res, next) => {
  insertEmployeesDetails(req, res, next);
};

//Employees Details
exports.employeeform = (req, res, next) => {
  let title = "Filup Employees details";
  res.render("employee", { title });
};

///ShowEmployees Details
exports.showEmployees = (req, res, next) => {
  employees
    .find()
    .then(function(data) {
      return res.json({
        status: true,
        data: data,
        message: "Employee Details Added"
      });
    })
    .catch(err => {
      return res.json({
        status: false,
        data: err,
        message: "Something Went Wrong..!"
      });
    });
};

// //Edit Employees Details
// exports.edtiEmployees = (req, res, next) => {
//   console.log(req.body);
//   employees.findById(req.params.id, (err, docs) => {
//     if (!err) {
//       res.render("./employee-edit", {
//         title: "Update Employees Details",
//         detail: docs
//       });
//     } else console.log("Error :", err);
//   });
// };

//Delete Employee details
exports.deleteEmployee = (req, res, next) => {
  employees
    .findByIdAndRemove(req.params.id)
    .then(data => {
      return res.json({
        status: true,
        data: {},
        message: "Employee Details is Delete"
      });
    })
    .catch(err => {
      return res.json({
        status: false,
        data: err,
        message: "Something Went Wrong..!"
      });
    });
};
