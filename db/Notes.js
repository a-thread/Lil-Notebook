const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);

const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readFileAsync("db/db.json", "utf-8")
    };

    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    };

    getNotes() {
        return this.read().then((notes) => {
            let notesArr;

            try { 
                notesArr = [].concat(JSON.parse(notes))
                
            } catch (err) {
                notesArr = [];
            }

            return notesArr;
        })
    };

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Note cannot be blank!")
        };

        const newNote = {title, text, id: uuidv4()};
        console.log(newNote);
        
        return this.getNotes().then((notes) => [...notes, newNote]).then((updatedNotes) => this.write(updatedNotes)).then(() => newNote);
        
       

    }

    deleteNote(id) {
        return this.getNotes().then(notes => notes.filter((note) => note.id !== id)).then(filteredNotes => this.write(filteredNotes))
    }
};

module.exports = new Notes();