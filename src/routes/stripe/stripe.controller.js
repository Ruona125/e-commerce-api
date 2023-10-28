require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

async function stripePayment(req, res) {
  //   try {
  //     stripe.charges.create(
  //       {
  //         source: req.body.tokenId,
  //         amount: req.body.amount,
  //         currency: "usd",
  //       },
  //       (stripeErr, stripeRes) => {
  //         if (stripeErr) {
  //           res.status(500).json(stripeErr);
  //         } else {
  //           res.status(200).json(stripeRes);
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     res.status(400).json("error making payment");
  //   }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  stripePayment,
};
