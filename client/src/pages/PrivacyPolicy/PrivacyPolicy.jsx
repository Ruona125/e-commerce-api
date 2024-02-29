import React from "react";
import PrivacyPolicyComponent from "../../components/PrivacyPolicyComponent/PrivacyPolicyComponent";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const PrivacyPolicy = () => {
  return (
    <div>
      <NavbarComponent />
      <div style={{ height: "70vh" }}>
      <PrivacyPolicyComponent />
      </div>
      {/* <FooterComponent /> */}
    </div>
  );
};

export default PrivacyPolicy;
