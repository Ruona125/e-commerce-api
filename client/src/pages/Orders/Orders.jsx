import React from "react";
import OrderComponent from "../../components/Orders/OrderComponent";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
const Orders = () => {
  return (
    <div>
      <NavbarComponent />
      <div>
        <OrderComponent />
      </div>
      <FooterComponent />
    </div>
  );
};

export default Orders;
