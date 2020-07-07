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

app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
  });
});


app.post("/api/notes", function (req, res) {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    const note = JSON.parse(data);
    const newDB = [];

    note.push(req.body);

    for (let i = 0; i < note.length; i++)
    {
        const newNote = {
            title: note[i].title,
            text: note[i].text,
            id: i
        };

        newDB.push(newNote);
    }

    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(newDB, null, 2), (err) => {
        if (err) throw err;
        res.json(req.body);
    });
});
});

app.delete("/api/notes/:id", function (req, res) {

})

app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
})
