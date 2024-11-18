const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")(
  "sk_test_51QAFqu2NNOL3ZlBnoISHd4X7NqSMPIYRL4BnekhDOCwBm8kzhbzAsB0HRgs9yPcbv5wDlfRVEjqdaUZS5yr0KFNn00hPeefSiu"
);

app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.product],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:4200/cancel?session_id={CHECKOUT_SESSION_ID}",
    });
    res.status(200).json({ id: session.id, url: session.url });
  } catch (err) {
    next(err);
  }
});

// New route to verify the session status
app.get("/session-status", async (req, res, next) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.status(200).json({ status: session.status, customer_email: session.customer_details.email });
  } catch (err) {
    next(err);
  }
});

app.listen(4242, () => console.log("app is running on port 4242"));
