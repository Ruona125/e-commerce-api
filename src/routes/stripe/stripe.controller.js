require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

async function stripePayment(req, res) {

  try {
    const { token, amount, description } = req.body;

    // Create a charge using the Stripe API
    const charge = await stripe.charges.create({
      amount, // Amount in cents
      currency: "CAD",
      source: token.id, // Token from the client
      description,
    });

    // You can save the charge object in your database for reference
    // Handle success or error here

    res.status(200).json({ message: "Payment successful" });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}

module.exports = {
  stripePayment,
};
