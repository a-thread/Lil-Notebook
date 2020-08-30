const router = require("express").Router();
const Notes = require("../db/Notes");

router.get("/notes", (req, res) => {
    Notes.getNotes().then(notes => res.json(notes))
})

module.exports = router;
