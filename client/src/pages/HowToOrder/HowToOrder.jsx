import React from "react";
import HowToOrderComponent from "../../components/HowToOrderComponent/HowToOrderComponent";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const HowToOrder = () => {
  return (
    <div>
      <NavbarComponent />
      <div style={{ height: "70vh" }}>
      <HowToOrderComponent />
      </div>
      <FooterComponent />
    </div>
  );
};

export default HowToOrder;
