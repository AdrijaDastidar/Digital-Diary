const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//* Route 1
// Fetch all Notes using GET "/api/notes/fetchnotes"
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send("Server Error");
  }
}
);

//* Route 2
// Add Note using POST "/api/notes/addnote"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title is required").notEmpty(),
    body("description", "Description is required").notEmpty(),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create new note
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      await note.save();
      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//* Route 3
// Update Note using PUT "/api/notes/updatenote/:id"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Create new note object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note to update
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });

    // Check if the note belongs to the logged-in user
    if (note.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized to update this note" });
    }

    // Update the note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).send("Server Error");
  }
  res.json(Note);
}
);


//* Route 4
// Delete Note using DELETE "/api/notes/deletenote/:id"
router.delete("/deletenote/:id", fetchuser, async(req, res)=>{
  try {
    // Find the note to delete
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });
    
    // Check if the note belongs to the logged-in user
    if(note.user.toString() != req.user.id){
      return res.status(401).json({ msg: "Not authorized to delete this note" });
    }
    
    // Delete the note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: "Note deleted" });}
    catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).send("Server Error");
    }
}
)

module.exports = router;
