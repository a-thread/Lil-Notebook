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
                
            } catch (err) {
                notesArr = []; // otherwise return an empty array
            }
            // return array
            return notesArr;
        })
    };

    // adding new note
    addNote(note) {
        // with the title and text
        const { title, text } = note;

        // title and text must have content to save
        if (!title || !text) {
            throw new Error("Note cannot be blank!")
        };

        // new note object with title, text, & id
        const newNote = {title, text, id: uuidv4()};
        
        // this expands our notes array, adds the new note to the end, creates a NEW ARRAY called "updated Notes" with the new note and writes the NEW ARRAY
        return this.getNotes().then((notes) => [...notes, newNote]).then((updatedNotes) => this.write(updatedNotes)).then(() => newNote);
    };

    // "Delete" note function (done by id number)
    deleteNote(id) {
        // This uses the same kind of logic. It doesn't actually delete the note, it creates a NEW ARRAY after filtering that note out of the array by id number.
        return this.getNotes().then(notes => notes.filter((note) => note.id !== id)).then(filteredNotes => this.write(filteredNotes))
    }
};

// Exporting constructor
module.exports = new Notes();