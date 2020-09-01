// Dependencies
const router = require("express").Router();
const Notes = require("../db/Notes");

// get request for existing notes
router.get("/notes", (req, res) => {
    Notes.getNotes()
    .then(notes => res.json(notes))
    .catch((err) => res.status(500).json(err))

})

// post request for new notes
router.post("/notes", (req, res) => {
    Notes.addNote(req.body)
    .then((note) => { 
        res.json(note);
        console.log(note);
    })
    .catch((err) => res.status(500).json(err))
})

// to "delete" a note
router.delete("/notes/:id", (req, res) => {
    Notes.deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err))
})

module.exports = router;
