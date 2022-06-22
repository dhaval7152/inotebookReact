const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// create a user using :POST "api/auth/createuser". No Login required

// jsonwebtoken for user security and verify
const JWT_SECRET="YOUCAN'tHackeM#";

router.post(
  "/createuser",
  [
    body("name", "Enter Valid Name").isLength({ min: 2 }),
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Should me >6").isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions

    // If there are erros,return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this Email exists aleready
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry the Email is Aleready Registered." });
      }
      // Password Hashing
      const salt= await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password,salt);

      // Create a new User
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data={
        user:{
          id:user.id,
        }
      }
      // Signing the authToken with Id Of User and Secret Token 
      const authToken= jwt.sign(data,JWT_SECRET);
      console.log(authToken);

      // sending token to user
      res.json({authToken});
      
      // Catch Function if some server error occurs
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);

// Authenticate a user using :POST "api/auth/login". No Login required


router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Cannot be Blank").exists(),
  ],
  async (req, res) => {

    // If there are erros,return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;

    // Check whether the user with this Email exists aleready
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try again With Correct Creditials." });
      }
      
      const passwordCompare= await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res
        .status(400)
        .json({ error: "Password is Incorrect.Please try again With Correct Creditials." });
      } 







      const data={
        user:{
          id:user.id,
        }
      }
      // Signing the authToken with Id Of User and Secret Token 
      const authToken= jwt.sign(data,JWT_SECRET);
      console.log(authToken);

      // sending token to user
      res.json({authToken});
      
      // Catch Function if some server error occurs
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error occured");
    }









  })










module.exports = router;

