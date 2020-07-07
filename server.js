const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});


app.post("/api/notes", function (req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let noteId = (savedNotes.length).toString();
  newNote.id = noteId;
  savedNotes.push(newNote);
  
  fs.writeFileSync("/api/notes/:id", JSON.stringify(savedNotes));
  console.log("Note saved!", newNote);
  res.json(savedNotes);
});

app.delete("/api/notes/:id", function (req, res) {

})

app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
})

// app.use("/",express.static(path.join(__dirname, "public")))
// app.use(express.static('public'));