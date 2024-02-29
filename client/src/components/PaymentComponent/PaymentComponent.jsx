import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const PaymentComponent = () => {
  const onToken = (token) => {
    const amount = 1000; // Amount in cents
    const description = 'Purchase Description';

    fetch('http://64.23.187.18:8000/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, amount, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or error here
        console.log(data);
      });
  };

  return (
    <StripeCheckout
      token={onToken}
      stripeKey="pk_test_51JqdR4GtNhHP2MJKDVgOZjeeYZypmfio8tz0KajoalMGBMLoEpqZP8Y0YtQzabWxkhlhPLbiqGLekfadlPKmAPeI00a6LdNakJ"
      name="Your Company Name"
      description="Purchase Description"
      amount={1000} // Amount in cents
      currency="CAD"
    >
      <button>Pay Now</button>
    </StripeCheckout>
  );
};

export default PaymentComponent;

