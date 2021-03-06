// Dependencies
// ===========================================================
const express = require("express");
const path    = require("path");
const uuid    = require("uuid").v4;
//console.log(uuid());

// In db.js file
const fs   = require("fs");
const util   = require("util");
//const readfile = util.promisify(fs.readFile);
//const writeFile = util.promisify(fs.writeFile);

const app = express();

//const PORT = 8080;
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
//virual path: app.use('/static', express.static('public'));
//absolute path: app.use('/static', express.static(path.join(__dirname, 'public')));

//----------------------------------------------------------------
// module.exports = {
//   async read() {
//     const notes = await readfile(__dirname + "/db.json", "utf8");
//     return JSON.parse(notes);
//   }
// };
//---------------------------------------------------------------

// Notes array of objects
// =============================================================
//var notes = [];

  // {
  //   title: "Note-1",
  //   text: "This is test note-1. For debugging purposes.",
  //   id: "uuid-123456"
  // },
  // {
  //   title: "Note-2",
  //   text: "This is test note-2. For debugging purposes.",
  //   id: "uuid-123457"
  // }
// ];

// Initial load of db.json
//notes.forEach(function(item, index) {

  // fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err) => {
  //   if (err) throw err; 
  // });
  //return writeFileAsync(__dirname + "/db.json", "utf8", );
  
//});

// Routes
// ===========================================================

app.get("/api/notes", function(req, res) {
  // Read the `db.json` file and return all saved notes as JSON.
  fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    //var notes = [];
    var notes = JSON.parse(data);
    res.json(notes);
  })
});


app.post("/api/notes", function(req, res) {
  //------------------------------------------------------------------------------
  // Create new note - receive a new note, on the request body, to save.
  // Add it to the `db.json` file and then return the new note to the client.
  //------------------------------------------------------------------------------

  var newNote = req.body;
  
  console.log(newNote);
  
  // A unique `id` will ned to be assigned to each note when it's saved.
  newNote.id = uuid();        //"uuid-123459";

  fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    // create notes array
    const notes = JSON.parse(data);
    // save new note in notes array
    notes.push(newNote);
    // save updated notes array to file  
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err; 
      res.json(newNote);
    });

  //res.json(newNote);
  })
});


app.delete("/api/notes/:id", function(req, res) {
  //------------------------------------------------------------------------------------
  // Query parameter contains the unique id of a note to delete.
  // To delete a note, need to read all notes from the `db.json` file, remove the note
  // with the given `id`, and then rewrite the notes to the `db.json` file.
  //------------------------------------------------------------------------------------

  var noteIdToDelete = req.params.id;
  var noteDeleted = false;

  fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    const notes = JSON.parse(data);
    //res.json(notes);
  
    for (var i = 0; i < notes.length && !noteDeleted; i++) {
      if (notes[i].id === noteIdToDelete) {
        console.log(notes[i].id);
        notes.splice(i, 1);
        noteDeleted = true;
      }
    }
    // save updated notes data to file  
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err; 
      res.json(notes);
    })
    //res.json(notes);
  })
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
  // res.sendFile(path.resolve(__dirname + "/public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  // res.sendFile(path.resolve(__dirname + "/public/index.html"));
});


// Listener
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));
