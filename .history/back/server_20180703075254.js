const stripe = require("stripe")("sk_test_EUE7vKS5CarTirsuHHU7fKzC");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const customer = stripe.customers.create(
    {
      id: 123,
      email: "julien.boyer@wildcodeschool.fr",
      description: "Je suis développeur JS",
      metadata: {
        adresse: "308 rue paul bert, 69003 Lyon"
      }
    },
    (err, customer) => {
      console.log(customer);
    }
  );
  res.send("Hello World!");
});

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
