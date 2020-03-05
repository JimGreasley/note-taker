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
var notes = [
  {
    title: "Note-1",
    text: "This is test note-1. For debugging purposes.",
    id: "uuid-123456"
  },
  {
    title: "Note-2",
    text: "This is test note-2. For debugging purposes.",
    id: "uuid-123457"
  }
];


// Routes
// ===========================================================

app.get("/api/notes", function(req, res) {
  // Read the `db.json` file and return all saved notes as JSON.
  res.json(notes);
});


app.post("/api/notes", function(req, res) {
  //------------------------------------------------------------------------------
  // Create new note - receive a new note to save on the request body,
  // add it to the `db.json` file, and then return the new note to the client.
  //------------------------------------------------------------------------------

  var newNote = req.body;
  
  console.log(newNote);
  
  // A unique `id` will ned to be assigned to each note when it's saved.
  newNote.id = uuid();        //"uuid-123459";

  notes.push(newNote);
  
  res.json(newNote);
});


app.delete("/api/notes/:id", function(req, res) {
  //------------------------------------------------------------------------------------
  // Query parameter contains the unique id of a note to delete.
  // To delete a note, need to read all notes from the `db.json` file, remove the note
  // with the given `id`, and then rewrite the notes to the `db.json` file.
  //------------------------------------------------------------------------------------

  var noteIdToDelete = req.params.id;
  var noteDeleted = false;
  
  for (var i = 0; i < notes.length && !noteDeleted; i++) {
    if (notes[i].id === noteIdToDelete) {
       console.log(notes[i].id);
       notes.splice(i, 1);
       noteDeleted = true;
    }
  }
  res.json(notes);
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
  // res.sendFile(path.resolve(__dirname + "/public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  // res.sendFile(path.resolve(__dirname + "/public/index.html"));
});



// ??
// app.use(function (req, res, next) {
//   res.status(404).send("Sorry can't find that!")
// });

// ???
// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// });


// Listener
// ===========================================================
// app.listen(PORT, function() {
//   console.log("App listening on PORT " + PORT);
// });
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))


