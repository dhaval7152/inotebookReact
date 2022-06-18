const express=require('express');
const router=express.Router();
const User=require("../models/User");
const { body, validationResult } = require('express-validator'); 

// create a user using :POST "api/auth/". Does'nt require Auth
router.post('/',[
    body('name','Enter Valid Name').isLength({ min: 2 }),
    body('email','Enter Valid Email').isEmail(),
    body('password','Password Should me >6').isLength({ min: 6 }),
    ],(req,res)=>{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=>{console.log(err)
    res.json({error:"Please Enter A unique value",message:err.message})})
} )

module.exports=router