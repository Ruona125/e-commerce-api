import React from "react";
import FaqComponent from "../../components/FaqComponent/FaqComponent";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const Faq = () => {
  return (
    <div>
      <NavbarComponent />
      <div style={{ height: "70vh" }}>
      <FaqComponent />
      </div>
      {/* <FooterComponent /> */}
    </div>
  );
};

export default Faq;
