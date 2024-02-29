import React from "react";
import FooterComponent from "../FooterComponent/FooterComponent";
import "./ReturnAndRefund.styles.css"

const ReturnAndRefundComponent = () => {
  return (
    <div className="refund-container">
      <div className="refund-wrapper">
        <h1>ShopLyft Refund and Return Policy</h1>

        <p>
          Thank you for shopping at ShopLyft. We appreciate your trust in
          us, and we are committed to providing you with a satisfying shopping
          experience. Please read the following policy carefully to understand
          our procedures for refunds and returns.
        </p>

        <h2>1. Refund Policy:</h2>

        <p>
          We understand that there might be instances where you may need to
          return a product or seek a refund. Our refund policy is designed to be
          fair and transparent.
        </p>

        <ul>
          <li>
            <strong>1.1 Eligibility for Refund:</strong>
            <ul>
              <li>
                The request for a refund must be made within 30 days of the
                purchase date.
              </li>
              <li>
                The item must be unused, in its original packaging, and in the
                same condition as received.
              </li>
              <li>
                The product must be defective, damaged, or significantly
                different from what was described on our website.
              </li>
            </ul>
          </li>

          <li>
            <strong>1.2 Refund Process:</strong>
            <ul>
              <li>
                If you meet the eligibility criteria, please follow these steps:
              </li>
              <li>
                Contact our customer support team at{" "}
                <a href="mailto:collectionsbu@gmail.com">
                  collectionsbu@gmail.com
                </a>{" "}
                within 30 days of receiving your order.
              </li>
              <li>
                Provide your order number, a clear description of the issue, and
                any supporting photos if applicable.
              </li>
              <li>
                Our team will review your request and provide you with further
                instructions.
              </li>
            </ul>
          </li>

          <li>
            <strong>1.3 Refund Options:</strong>
            <ul>
              <li>
                Upon approval, you may choose between the following refund
                options:
              </li>
              <li>Full refund to the original payment method.</li>
              <li>ShopLyft store credit for the equivalent amount.</li>
            </ul>
          </li>
        </ul>

        <h2>2. Return Policy:</h2>

        <p>
          We strive to ensure that you are satisfied with your purchase. If, for
          any reason, you wish to return an item, please follow our return
          policy guidelines:
        </p>

        <ul>
          <li>
            <strong>2.1 Eligibility for Return:</strong>
            <ul>
              <li>
                The request for a return must be made within 30 days of the
                purchase date.
              </li>
              <li>
                The item must be unused, in its original packaging, and in the
                same condition as received.
              </li>
              <li>
                Return shipping costs are the responsibility of the customer
                unless the return is due to a mistake on our part.
              </li>
            </ul>
          </li>

          <li>
            <strong>2.2 Return Process:</strong>
            <ul>
              <li>To initiate a return, please follow these steps:</li>
              <li>
                Contact our customer support team at{" "}
                <a href="mailto:collectionsbu@gmail.com">
                  collectionsbu@gmail.com
                </a>{" "}
                within 30 days of receiving your order.
              </li>
              <li>
                Provide your order number, reason for return, and any supporting
                photos if applicable.
              </li>
              <li>
                Our team will guide you through the return process, including
                the return shipping instructions.
              </li>
            </ul>
          </li>

          <li>
            <strong>2.3 Return Options:</strong>
            <ul>
              <li>
                Upon receiving and inspecting the returned item, you may choose
                between the following options:
              </li>
              <li>Exchange for a replacement item of equal value.</li>
              <li>
                Refund to the original payment method (minus any applicable
                shipping fees).
              </li>
            </ul>
          </li>
        </ul>

        <h2>3. Contact Information:</h2>

        <p>
          If you have any questions or concerns regarding our Refund and Return
          Policy, please contact us at:
        </p>

        <p>
          Email:{" "}
          <a href="mailto:collectionsbu@gmail.com">collectionsbu@gmail.com</a>
        </p>
        <p>Phone: [Your Customer Support Phone Number]</p>

        <p>
          <em>
            Note: ShopLyft reserves the right to amend or update this
            policy at any time. Please check our website for the most current
            version.
          </em>
        </p>
      </div>
      <FooterComponent />
    </div>
  );
};

export default ReturnAndRefundComponent;
