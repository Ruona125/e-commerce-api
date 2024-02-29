import React from "react";
import CertainProductComponent from "../../components/CertainProductComponent/CertainProductComponent";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";


const CertainProduct = () => {
  return (
    <div>
      <NavbarComponent />
      <CertainProductComponent />
      {/* <FooterComponent /> */}
    </div>
  );
};

export default CertainProduct;
