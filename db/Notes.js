// Dependencies
const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile); // reading note
const writeFileAsync = util.promisify(fs.writeFile); // writing note

// 'Notes' Constructor
class Notes {
    // read note function
    read() {
        return readFileAsync("db/db.json", "utf-8")
    };
    // write note function
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    };
    // get notes function
    getNotes() {
        return this.read().then((notes) => {

            // naming array
            let notesArr;

            // concating parsed notes into array
            try {
                notesArr = [].concat(JSON.parse(notes))

            // otherwise returning an empty array
            } catch (err) {
                notesArr = [];
            }
            // return array
            return notesArr;
        })
    };

    // Add New Note Function
    addNote(note) {
        // note with the title and text
        const { title, text } = note;

        // title and text must have content to save
        if (!title || !text) {
            throw new Error("Note cannot be blank!")
        };

        // new note object includes title, text, & id (using uuid version 4 that automatically generates unique ID)
        const newNote = { title, text, id: uuidv4() };

        // returning notesArr from getNotes() along with note we want to add
        return this.getNotes()
            // expanding notesArr and adding our new note to the end
            .then((notesArr) => [...notesArr, newNote])
            // creating a NEW ARRAY called "updatedNotes" with the new note included and writing said array
            .then((newNotesArr) => this.write(newNotesArr))
            // emptying newNote for the next time we need to add a note
            .then(() => newNote);
    };

    // "Delete" note function (done by id number)
    deleteNote(id) {
        // This uses the same kind of logic. It doesn't actually delete the note...
        return this.getNotes()
            // we find the note we want to delete by filtering throught notesArr by id 
            .then(notesArr => notesArr.filter((note) => note.id !== id))
            // and create a NEW ARRAY with the new note inside
            .then(filteredNotesArr => this.write(filteredNotesArr))
    }
};

// Exporting constructor
module.exports = new Notes();