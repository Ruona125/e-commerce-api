import React from "react";
import FooterComponent from "../FooterComponent/FooterComponent";
import "./TermsOfUse.styles.css"

const TermsOfUseComponent = () => {
  return (
    <div>
      <center>
        <h3>Terms of Use for ShopLyft E-Commerce Website</h3>
      </center>
      <div className="text-content">
        <h4 className="introduction-header">
          Welcome to ShopLyft! Before using our website, please read the
          following Terms of Use carefully. By accessing or using our website,
          you agree to be bound by these terms. If you do not agree to these
          terms, please refrain from using our services.
        </h4>
        <ol>
          <li>Acceptance of Terms</li>
          <p>
            By accessing or using the ShopLyft website, you agree to comply
            with and be bound by these Terms of Use, our Privacy Policy, and any
            other policies or guidelines posted on our website.
          </p>
          <li>Use of the Website</li>
          <p>
            You must be at least 18 years old to use this website. You agree to
            use the website for lawful purposes only and in a manner consistent
            with all applicable laws and regulations.
          </p>
          <li>Account Registration</li>
          <p>
            To access certain features of the website, you may be required to
            register for an account. You are responsible for maintaining the
            confidentiality of your account information and password. You agree
            to notify us immediately of any unauthorized use of your account.
          </p>
          <li>Product Information</li>
          <p>
            We strive to provide accurate and up-to-date information about our
            products. However, we do not guarantee the accuracy, completeness,
            or reliability of any product information on the website. Prices and
            availability are subject to change without notice.
          </p>
          <li>Ordering and Payment</li>
          <p>
            By placing an order on ShopLyft, you agree to provide accurate
            and complete information about yourself. You are responsible for any
            charges incurred under your account. Payment information will be
            handled securely, but we are not responsible for any unauthorized
            access to your payment information.
          </p>
          <li> Shipping and Delivery</li>
          <p>
            We will make every effort to ensure that your order is delivered
            promptly and accurately. However, we are not responsible for delays
            or errors caused by third-party shipping carriers.
          </p>
          <li>Returns and Refunds</li>
          <p>
            Please review our Return Policy for information on returns and
            refunds. We reserve the right to refuse returns or exchanges.
          </p>
          <li> User Content</li>
          <p>
            You may submit reviews, comments, and other content on our website.
            By submitting such content, you grant ShopLyft a non-exclusive,
            royalty-free, perpetual, irrevocable, and fully sublicensable right
            to use, reproduce, modify, adapt, publish, translate, create
            derivative works from, distribute, and display such content.
          </p>
          <li>Intellectual Property</li>
          <p>
            All content on the ShopLyft website, including text, graphics,
            logos, images, and software, is the property of ShopLyft or its
            content suppliers and is protected by international copyright laws.
          </p>
          <li>Termination</li>
          <p>
            ShopLyft reserves the right to terminate or suspend your
            account and access to the website at any time for any reason,
            without notice.
          </p>
          <li>Changes to Terms of Use</li>
          <p>
            ShopLyft reserves the right to modify or update these Terms of
            Use at any time without prior notice. It is your responsibility to
            review these terms periodically.
          </p>
        </ol>
      </div>

      <br />
      <FooterComponent />
    </div>
  );
};

export default TermsOfUseComponent;
