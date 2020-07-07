var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/notes", function (req, res) {
  return res.json(notes);
});

// app.post("/api/notes", function (req, res) {
//   var newNote = req.body;
//   newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
//   console.log(newNote);
//   notes.push(newNote);
//   res.json(newNote);
// });
