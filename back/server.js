const colors = require("colors");

const stripe = require("stripe")("sk_test_EUE7vKS5CarTirsuHHU7fKzC");
const express = require("express");
const app = express();

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "zappo",
  port: 8889
});

connection.connect();

//stripe.com/docs/api#order_object

/**
 * Configure Stripe
 * 20 secondes
 */

// Testing Env:
//  https://stripe.com/docs/testing

stripe.setTimeout(20000); // in ms (this is 20 seconds)

app.get("/customer/:id", (req, res) => {
  stripe.customers.retrieve(req.params.id, (err, customer) => {
    if (err) {
      res.json(err);
    }
    res.json(customer);
  });
});

app.get("/charge/:id", (req, res) => {
  stripe.charges.retrieve(req.params.id, (err, charge) => {
    if (err) {
      res.json(err);
    }
    res.json(charge);
  });
});

app.get("/charge/approuved/:id", (req, res) => {
  stripe.charges.retrieve(req.params.id, (err, charge) => {
    if (err) {
      res.json(err);
    }

    if (charge.captured === false) {
      stripe.charges.update(
        req.params.id,
        {
          captured: true
        },
        (err, charge) => {
          // asynchronously called
          if (err) {
            res.json(err);
          }
          return res.json(true);
        }
      );
    }
    return res.json(false);
  });
});

app.get("/", (req, res) => {
  // Customer
  const customerData = {
    //id: 137,
    email: "florent.boyer@wildcodeschool.fr"
  };

  // Source
  const sourceData = {
    object: "card",
    exp_month: 10,
    exp_year: 2018,
    number: "4242424242424242",
    cvc: 942
  };

  const order = {
    cart: JSON.stringify([
      { id: 1, name: "Produit A", quantity: 1, price: 10, tva: 20 },
      { id: 2, name: "Produit B", quantity: 2, price: 5, tva: 20 }
    ]),
    total: 24,
    status: 1,
    created: new Date()
  };

  stripe.customers
    .create(customerData)
    .then(customer => {
      customerData.customerId = customer.id;
      order.customer_id = customer.id;
      customerData.nom = "Boyer Julien";
      customerData.tel = "0674585648";
      customerData.created = new Date();
      connection.query(
        "INSERT INTO customers SET ?",
        customerData,
        (error, results, fields) => {
          if (error) throw error;
          // Neat!
        }
      );

      return stripe.customers.createSource(customer.id, {
        source: sourceData
      });
    })
    .then(source => {
      return stripe.charges.create({
        amount: 0.5 * 100,
        currency: "eur",
        customer: source.customer,
        description: "Je suis une super description du paiment",
        source: source.id,
        capture: false,
        metadata: { order_id: 6735 }
      });
    })
    .then(charge => {
      order.chargeId = charge.id;
      // https://stripe.com/docs/api
      console.log(
        colors.rainbow(
          "******************************* FIN! ******************************* "
        )
      );

      connection.query(
        "INSERT INTO orders SET ?",
        order,
        (error, results, fields) => {
          if (error) throw error;
          // Neat!
        }
      );
      res.send(true);
    })
    .catch(err => {
      console.log(colors.red.underline(err.code));
      console.log(colors.red(err.message));
    });
});

app.listen(5000, () => {
  console.log("Example app listening on port 4000!");
});
