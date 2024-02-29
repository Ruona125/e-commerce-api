import React from "react";
import CartComponent from "../../components/Carts/CartComponent";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
const Carts = () => {
  return (
    <div>
      <div >
        <CartComponent />
      </div>
      <FooterComponent />
    </div>
  );
};

export default Carts;
