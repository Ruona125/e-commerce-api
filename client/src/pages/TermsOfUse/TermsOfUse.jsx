import React from "react";
import TermsOfUseComponent from "../../components/TermsOfUseComponent/TermsOfUseComponent";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const TermsOfUse = () => {
  return (
    <div>
      <NavbarComponent />
      <div style={{ height: "70vh" }}>
        <TermsOfUseComponent />
      </div>
      {/* <FooterComponent /> */}
    </div>
  );
};

export default TermsOfUse;
