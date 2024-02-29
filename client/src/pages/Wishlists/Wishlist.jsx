import React from "react";
import WishlistComponent from "../../components/Wishlist/WishlistComponent";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
const Wishlist = () => {
  return (
    <div>
      <div>
        <WishlistComponent />
      </div>
      <FooterComponent />
    </div>
  );
};

export default Wishlist;
