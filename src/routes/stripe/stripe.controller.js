require("dotenv").config();
const stripe = require("stripe")('sk_test_51JqdR4GtNhHP2MJKZWxXhaAVjiLfLgycHpR4773RzpkLFsbml3h4Rtq90OaznjA2WGhTiPGrBvlWZm40vVY5Me3M00iz349p4w');

async function stripePayment(req, res) {
  // try {
  //   stripe.charges.create(
  //     {
  //       source: req.body.tokenId,
  //       amount: req.body.amount,
  //       currency: "usd",
  //     },
  //     (stripeErr, stripeRes) => {
  //       if (stripeErr) {
  //         res.status(500).json(stripeErr);
  //       } else {
  //         res.status(200).json(stripeRes);
  //       }
  //     }
  //   );
  // } catch (error) {
  //   res.status(400).json("error making payment");
  // }

  //this is the one that worked
  // try {
  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount: req.body.amount,
  //     currency: "USD",
  //   });
  //   res.json({ clientSecret: paymentIntent.client_secret });
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }

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
