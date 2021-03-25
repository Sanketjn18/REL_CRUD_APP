const express = require("express");
const mongoose = require("mongoose");
const User = require("../DB/User");
const route = express.Router();

//api for Create data from database
route.post("/userModel", async (req, res) => {
  const { firstName, lastName, mobile, email } = req.body;
  let user = {};
  user.firstName = firstName;
  user.lastName = lastName;
  user.mobile = mobile;
  user.email = email;
  let userModel = new User(user);
  await userModel.save();
  res.json(userModel);
});

//api for Read data from database
route.get("/getdata", function (req, res) {
  User.find({}, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

//api for Delete data from database
route.post("/Removedata", function (req, res) {
  User.remove({ _id: req.body.id }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: "Record has been Deleted..!!" });
    }
  });
});

//api for Update data from database
route.post("/Updatedata", function (req, res) {
  User.findByIdAndUpdate(
    req.body.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobile: req.body.mobile,
      email: req.body.email,
    },
    function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.send({ data: "Record has been Updated..!!" });
    }
  );
});

module.exports = route;
