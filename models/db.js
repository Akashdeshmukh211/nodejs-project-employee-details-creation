const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log("Connected")
}).catch((err)=>{
  console.log("No connection")
  console.log(err)
});

require("./employee")