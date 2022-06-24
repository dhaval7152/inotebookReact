const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Route:1: Get all the notes using GET:"/api/notes/fetchallnotes" Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
});
// Route:2:Add a note using post:"/api/notes/addnote" Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title Must Be 3 character").isLength({ min: 3 }),
    body("description", "Description Must Be 5 character").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there is errors,retrn bad request and the errros
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();

      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);


// Route:3:Update a note using PUT:"/api/notes/updatenote/:id" Login Required
router.put("/updatenote/:id",
  fetchuser,
  async (req, res) => {
    const {title,description,tag}=req.body;
    // Create a newNote Object
    const newNote={}
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //find the note to be updated and update it
    let note=await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")} 
    
    if(note.user.toString()!==req.user.id){
      return res.status(401).send("Not Allowed");
    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});

  })












module.exports = router;
















































