import React from "react";
import FooterComponent from "../FooterComponent/FooterComponent";
import "./FaqComponent.styles.css"

const FaqComponent = () => {
  return (
    <div>
      <div className="text-content faq-content">
        <h1>How to Place an Order on ShopLyft</h1>
        <ol>
          <li>Visit our website and browse through our collections.</li>
          <li>
            Click on the desired item, select the size, and click "Add to Cart."
          </li>
          <li>
            Once you've added all your items, click on the shopping cart icon
            and proceed to checkout.
          </li>
        </ol>

        <h4>Payment Methods</h4>
        <p>
          We accept a variety of payment methods, including credit/debit cards,
          PayPal, and other secure payment gateways.
        </p>

        <h4>Is it Safe to Use My Credit/Debit Card?</h4>
        <p>
          Yes, we prioritize the security of your personal information. All
          transactions are encrypted and processed through secure payment
          gateways.
        </p>

        <h4>Modifying or Canceling Orders</h4>
        <p>
          Unfortunately, we are unable to modify or cancel orders once they are
          placed. Please double-check your order before confirming your
          purchase.
        </p>

        <h4>Order Tracking</h4>
        <p>
          Once your order is shipped, you will receive a confirmation email with
          a tracking number. You can use this number to track your order on our
          website.
        </p>

        <h4>Return Policy</h4>
        <p>
          We have a hassle-free return policy. If you are not satisfied with
          your purchase, you can return it within [X] days for a full refund or
          exchange. Please refer to our{" "}
          <a href="[your-return-page-url]">Returns & Exchanges page</a> for more
          details.
        </p>

        <h4>International Shipping</h4>
        <p>
          Yes, we do offer international shipping. Shipping costs and delivery
          times may vary depending on the destination.
        </p>

        <h4>Contact Customer Support</h4>
        <p>
          You can reach our customer support team through the chat icon below {" "}
          <a href="mailto:collectionsbu@gmail.com">
            collectionsbu@gmail.com
          </a>
          . We aim to respond to all inquiries within 24 hours.
        </p>

        <h4>Promotions and Discounts</h4>
        <p>
          We regularly run promotions and discounts. Stay updated by subscribing
          to our newsletter or checking our website for the latest offers.
        </p>

        <h4>Size Guide</h4>
        <p>
          Yes, you can find our size guide on each product page to help you
          choose the right size. If you have any further questions, feel free to
          contact our customer support.
        </p>

        <h4>Defective or Damaged Items</h4>
        <p>
          We apologize for any inconvenience. Please contact our customer
          support with your order Item name and images of the defective or damaged
          item, and we will assist you with a replacement or refund.
        </p>
      </div>
      <FooterComponent />
    </div>
  );
};

export default FaqComponent;
