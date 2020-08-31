const router = require("express").Router();
const Notes = require("../db/Notes");

router.get("/notes", (req, res) => {
    Notes.getNotes()
    .then(notes => res.json(notes))
    .catch((err) => res.status(500).json(err))

})

router.post("/notes", (req, res) => {
    Notes.addNote(req.body)
    .then((note) => { 
        res.json(note);
        console.log(note);
    })
    .catch((err) => res.status(500).json(err))
})

router.delete("/notes/:id", (req, res) => {
    Notes.deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err))
})

module.exports = router;
