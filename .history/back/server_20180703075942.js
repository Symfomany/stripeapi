const stripe = require("stripe")("sk_test_EUE7vKS5CarTirsuHHU7fKzC");
const express = require("express");
const app = express();

/**
 * Configure Stripe
 * 20 secondes
 */
stripe.setTimeout(20000); // in ms (this is 20 seconds)

app.get("/", (req, res) => {
  const customer = stripe.customers
    .create({
      id: 123,
      email: "julien.boyer@wildcodeschool.fr",
      description: "Je suis développeur JS"
    })
    .then(customer => {
      console.log(customer);
      return stripe.customers.createSource(customer.id, {
        source: "tok_visa"
      });
    })
    .then(source => {
      console.log(source);

      return stripe.charges.create({
        amount: 500,
        currency: "eur",
        customer: source.customer
      });
    })
    .then(function(charge) {
      // New charge created on a new customer
      console.log(charge);
    })
    .catch(function(err) {
      // Deal with an error
      console.log(err);
    });

  res.send("Hello World!");
});

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
