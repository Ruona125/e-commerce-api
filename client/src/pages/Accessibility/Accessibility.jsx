import React from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import AccessibilityComponent from "../../components/AccessibilityComponent/AccessibilityComponent";

const Accessibility = () => {
  return (
    <div>
      <NavbarComponent />
      <div style={{ height: "70vh" }}>
        <AccessibilityComponent />
      </div>
      <FooterComponent />
    </div>
  );
};

export default Accessibility;
