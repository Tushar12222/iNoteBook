const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Fetch all notes: GET "/api/notes/fetchallnotes" login reqd.

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    //catch unexpected errors
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 2: add note: POST "/api/notes/addnote" login reqd.

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      //catch unexpected errors
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3: update a note: PUT "/api/notes/updatenote" login reqd.

router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //Create a new note object
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      //Find the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      //catch unexpected errors
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 4: delete a note: DELETE "/api/notes/deletenote" login reqd.
router.delete(
  "/deletenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      //Find the note to be deleted and delete it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ sucess: "Deleted Successfully" });
    } catch (error) {
      //catch unexpected errors
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
module.exports = router;
