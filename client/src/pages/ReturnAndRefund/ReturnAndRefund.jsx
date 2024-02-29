import React from "react";
import ReturnAndRefundComponent from "../../components/ReturnAndRefundComponent/ReturnAndRefundComponent";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const ReturnAndRefund = () => {
  return (
    <div>
      <NavbarComponent />
      <div style={{ height: "70vh" }}>
        <ReturnAndRefundComponent />
      </div>
      {/* <FooterComponent /> */}
    </div>
  );
};

export default ReturnAndRefund;
