const express = require('express');
const router=express.Router();
const studentscontroller=require("../controllers/students controller")


//view all records
router.get("/",studentscontroller.view);

//add new records
router.get("/adduser",studentscontroller.adduser);
router.post ("/adduser",studentscontroller.save);

//new records
router.post ("/adduser",studentscontroller.save);

//update records
router.get ("/edituser/:id",studentscontroller.edituser);
router.post ("/edituser/:id",studentscontroller.edit);

//Delete Records
router.get ("/deleteuser/:id",studentscontroller.delete);

module.exports=router;
