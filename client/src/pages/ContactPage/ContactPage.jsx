import React from "react";
import ContactComponent from "../../components/ContactComponent/ContactComponent";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const ContactPage = () => {
  return (
    <div>
      <NavbarComponent />
      <div style={{ height: "70vh" }}>
      <ContactComponent />
      </div>
      <FooterComponent />
    </div>
  );
};

export default ContactPage;
