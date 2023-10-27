const stripe = require("stripe")(process.env.STRIPE_KEY);

function stripePayment(req, res) {
  try {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(500).json(stripeErr);
        } else {
          res.status(200).json(stripeRes);
        }
      }
    );
  } catch (error) {
    res.status(400).json("error making payment");
  }
}

module.exports = {
  stripePayment,
};
