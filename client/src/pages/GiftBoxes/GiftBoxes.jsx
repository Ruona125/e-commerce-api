import React from "react";
import GiftBoxesComponent from "../../components/Giftboxes/GiftBoxesComponent";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const GiftBoxes = () => {
  return (
    <div>
      <NavbarComponent />
      <GiftBoxesComponent />
      {/* <FooterComponent /> */}
    </div>
  );
};

export default GiftBoxes;
