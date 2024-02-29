import React from "react";
import "./Footer.styles.css";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

const FooterComponent = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <div>
          <h2>ShopLyft</h2>
          {/* <h3>
            <Link className="footer-link" to="/contact">
              Contact us
            </Link>
          </h3> */}
          <h3>
            <Link className="footer-link" to="/terms-of-use">
              Terms Of Use
            </Link>
          </h3>
          {/* <h3>
            <Link className="footer-link" to="/accessibility">
              Accessibility
            </Link>
          </h3> */}
          <h3>
            <Link className="footer-link" to="/privacy/policy">
              Privacy Policy
            </Link>
          </h3>
          <h3>
            <Link className="footer-link" to="/faq">
              Frequently Asked Questions
            </Link>
          </h3>
        </div>

        <div>
          <h2>Services</h2>
          {/* <h3>
            <Link className="footer-link" to="/home">
              Wigs
            </Link>
          </h3> */}
          <h3>
            <Link className="footer-link" to="/hair-creams">
              Hair Creams/Treatments
            </Link>
          </h3>
          <h3>
            <Link className="footer-link" to="/gift-boxes">
              Gift Boxes
            </Link>
          </h3>
         
          <h3>
            <Link className="footer-link" to="/return-refund">
              Return and Refund
            </Link>
          </h3>
          {/* <h3>Track Order</h3> */}
        </div>

        <div>
          <h2>Contact Us</h2>
          <h3>TEL | WhatsApp: +1234567</h3>
          <h3>Email: collectionsbu@gmail.com</h3>
          <h3>Address: 7, albarta, canada</h3>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
