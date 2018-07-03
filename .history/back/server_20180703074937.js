const stripe = require("stripe")("pk_test_qeGYvcFlvD1QxMkDbOhHENJ1");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
