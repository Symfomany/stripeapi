const stripe = require("stripe")("sk_test_EUE7vKS5CarTirsuHHU7fKzC");
const express = require("express");
const app = express();

//stripe.com/docs/api#order_object

/**
 * Configure Stripe
 * 20 secondes
 */
https: stripe.setTimeout(20000); // in ms (this is 20 seconds)

app.get("/", (req, res) => {
  stripe.customers
    .create({
      id: 135,
      email: "julien.boyer@wildcodeschool.fr",
      description: "Je suis développeur JS",
      metadata: {
        passion: "Aime le JS"
      }
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
    .then(charge => {
      console.log(charge);
      // https://stripe.com/docs/api
      // New charge created on a new customer
      return stripe.orders.create({
        currency: "eur",
        items: [
          {
            description: "Livre JS",
            amount: 12.45,
            quantity: 2,
            currency: "eur",
            type: "sku"
          },
          {
            description: "Livre React",
            amount: 10.5,
            quantity: 1,
            currency: "eur",
            type: "sku"
          }
        ],
        shipping: {
          name: "Boyer Julien",
          address: {
            line1: "308 Rue Paul Bert",
            city: "Lyon",
            state: "FR",
            country: "Fr",
            postal_code: "69003"
          }
        },
        email: "julien.boyer@wildcodeschool.fr"
      });
    })
    .then(order => {
      console.log(order);
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
