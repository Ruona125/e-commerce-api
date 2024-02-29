import React from "react";
import FooterComponent from "../FooterComponent/FooterComponent";
import "./PrivacyPolicy.styles.css"

const PrivacyPolicyComponent = () => {
  return (
    <div>
      <center>
        <h3>ShopLyft Privacy Policy</h3>
      </center>
      <div className="text-content privacy">
      <section>
        <h2 className="policy-heading">1. Information We Collect:</h2>
        <p>
          <strong>Personal Information:</strong> We may collect personally
          identifiable information, such as your name, email address, postal
          address, and payment details when you create an account, make a
          purchase, or subscribe to our newsletters.
        </p>
        <p>
          <strong>Automatically Collected Information:</strong> We may collect
          information about your device, IP address, browser type, and browsing
          patterns when you interact with our Services. This information helps
          us improve our Services and provide a better user experience.
        </p>
        <p>
          <strong>Cookies and Similar Technologies:</strong> We use cookies and
          similar technologies to enhance your browsing experience, personalize
          content, and gather information about your preferences.
        </p>
      </section>

      <section>
        <h2 className="policy-heading">2. How We Use Your Information:</h2>
        <p>
           <strong>Providing and Improving Services:</strong> We use your
          information to deliver and enhance our Services, respond to your
          inquiries, and improve the functionality and user experience of our
          website.
        </p>
        <p>
           <strong>Communication:</strong> We may use your contact information
          to send you updates, newsletters, and promotional materials. You can
          opt-out of these communications at any time.
        </p>
        <p>
          <strong>Analytics:</strong> We may use analytics tools to analyze
          user behavior and trends, helping us understand how users interact
          with our Services and make informed decisions to improve them.
        </p>
      </section>

      <section>
        <h2 className="policy-heading">3. Sharing Your Information:</h2>
        <p>
          <strong>Third-Party Service Providers:</strong> We may share your
          information with third-party service providers that assist us in
          delivering our Services, such as payment processors, hosting
          providers, and analytics services.
        </p>
        <p>
         <strong>Legal Compliance:</strong> We may disclose your information
          when required by law or in response to legal requests.
        </p>
      </section>

      <section>
        <h2 className="policy-heading">4. Security:</h2>
        <p>
          We take reasonable measures to protect your personal information from
          unauthorized access, disclosure, alteration, and destruction
        </p>
      </section>

      <section>
        <h2 className="policy-heading">5. Changes to this Privacy Policy:</h2>
        <p>
          We may update this Privacy Policy periodically. The date of the last
          update will be displayed at the top of this page.
        </p>
      </section>

      <section>
        <h2 className="policy-heading">6. Contact Us:</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
        </p>
      </section>
      <section>
        <p>
          By using our Services, you consent to the terms outlined in this
          Privacy Policy. Please review this policy regularly for any updates.
        </p>
      </section>
      </div>
      <FooterComponent />
    </div>
  );
};

export default PrivacyPolicyComponent;
