const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "database",
  multipleStatements: true,
});

app.post("/create", function (req, res) {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;

  db.query(
    "INSERT INTO contacts (name, phone, email) VALUES (?,?,?)",
    [name, phone, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/contacts", function (req, res) {
  db.query("SELECT * FROM contacts", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", function (req, res) {
  const id = req.params.id;
  db.query("DELETE FROM contacts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;

  let string =
    "UPDATE contacts SET name = ? WHERE id = ?;UPDATE contacts SET phone = ? WHERE id = ?;UPDATE contacts SET email = ? WHERE id = ?";
  db.query(string, [name, id, phone, id, email, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running on 3001 port");
});
