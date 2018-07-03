const stripe = require("stripe")("sk_test_EUE7vKS5CarTirsuHHU7fKzC");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
