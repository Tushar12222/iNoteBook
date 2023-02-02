const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "iNotebook";

//Route 1: Create a user using :POST "/api/auth/createuser" no login reqd.

router.post(
  "/createuser",
  [
    //validating the request sent
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name with length of atleast 3").isLength({
      min: 3,
    }),
    body("password", "Enter a password of min length 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
      return res.status(400).json({ success,errors: errors.array() });
    }
    //checking if the user email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      //if the email already is used then
      if (user) {
        return res.status(200).json({ success,error: "Email already in use" });
      }
      //encrypting password before storing it to database
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //if every detail is fine acc to the mongo schema
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      //if the email is new then
      //sending back a jwt token to the user
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;

      res.json({ success,authtoken });
    } catch (error) {
      //catch unexpected errors
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 2: Authenticate a user: POST "/api/auth/login" no login reqd
router.post(
  "/login",
  [
    //validating the request sent for login and checking if the fields are valid before checking for the user existence in the database
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  //checking for errors
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //if no errors found, the email and password are then searched in the database
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      //if the user does not exist in the database then
      if (!user) {
        success = false
        return res
          .status(400)
          .json({ success,error: "Please enter the right credentials" });
      }
      //using bcrypt which internally hashes the password using the compare function and checks if the entered password exists in the database
      const passwordCompare = await bcrypt.compare(password, user.password);
      //if the password does not match theen the same error is sent to avoid aid to hackers
      if (!passwordCompare) {
        success = false
        return res
          .status(400)
          .json({ success,error: "Please enter the right credentials" });
      }
      //if everything is right then a json web token is created with the user id and a secret message
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      //the jwt token is sent as a response back to the client
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3: Get logged in user details: POST "/api/auth/getuser" Login reqd
router.post(
  "/getuser",
  fetchuser,

  //checking for errors
  async (req, res) => {
    try {
      const userId = req.user.id;
      
      const user = await User.findById(userId).select("-password");
      res.send(user);
      
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
module.exports = router;
