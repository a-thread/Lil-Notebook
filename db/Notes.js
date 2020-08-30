const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readFileAsync("db/db.json", "utf-8")
    }

    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }

    getNotes() {
        return this.read().then(notes => {
            let readNotes = [];

            try { 
                readNotes = readNotes.concat(JSON.parse(notes))
                
            } catch (error) {
                readNotes = [];
            }
        })
    }
}

module.exports = new Notes();