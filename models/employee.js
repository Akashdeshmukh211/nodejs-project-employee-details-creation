const mongoose = require("mongoose");

let employeeSchema = new mongoose.Schema({
  fullName: {
    type: "string"
  },
  email: {
    type: "string"
  },
  phone: {
    type: Number
  }
});

mongoose.model("employee", employeeSchema);
