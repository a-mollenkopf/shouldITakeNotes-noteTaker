const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("An error occurred reading your data.");
    }
    const arrayOfNotes = JSON.parse(data);
    res.json(arrayOfNotes);
  });
});


app.post("/api/notes", function (req, res) {
  fs.readFile("/db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("An error occured retrieving the data.")
    }
    const arrayOfNotes = JSON.parse(data);
    const newNote = {...req.body, id: arrayOfNotes.length + 1};
    arrayOfNotes.push(newNote);

    fs.writeFile("db/db.json", JSON.stringify(arrayOfNotes), "utf8", function(err) {
      if (err) {
        return res.send("An error ocurred writing your data.");
      }
    });
    res.json(arrayOfNotes);
  });
});

// app.delete("/api/notes/:id", function (req, res) {
  
// });

app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}`);
});
