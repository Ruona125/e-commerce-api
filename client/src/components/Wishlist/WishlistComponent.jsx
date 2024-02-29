import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import NavbarComponent from "../navbarComponent/NavbarComponent";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const WishlistComponent = () => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const url = `http://64.23.187.18:8000/wishlist/${user._id}`;
    const headers = {
      "Content-Type": "aplication/json",
      Authorization: localStorage.getItem("token"),
    };
    axios
      .get(url, { headers })
      .then((response) => {
        setLoading(false);
        setWishlists(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [user._id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginTop: "-10em",
        }}
      >
        <CircularProgress style={{ color: "rgb(214, 119, 178)" }} />
      </Box>
    );
  }

  if (
    wishlists.length === 0 ||
    wishlists.every((wishlist) => wishlist.products.length === 0)
  ) {
    return (
      <>
      <NavbarComponent />
      <div className="no-products-message">
          <center>
              <p className="no-prod-message">No Items in Wishlist</p>
          </center>
        </div>
        </>
    );
  }

  const handleWishlistDelete = async (wishlistId) => {
    try {
      const url = `http://64.23.187.18:8000/wishlist/${wishlistId}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      };

      // Make a DELETE request to remove the wishlist
      await axios.delete(url, { headers });

      // Update the state to reflect the removal of the wishlist
      const updatedWishlists = wishlists.filter(
        (wishlist) => wishlist.id !== wishlistId
      );
      setWishlists(updatedWishlists);
    } catch (error) {
      console.log(error.message);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  const handleQuantityChange = (wishlistId, productId, quantityChange) => {
    const updatedWishlists = wishlists.map((wishlist) => {
      if (wishlist.id === wishlistId) {
        const updatedProducts = wishlist.products.map((product) => {
          if (product.productId === productId) {
            // calculate the new quantity
            const newQuantity = product.quantity + quantityChange;

            // Ensure the new quantity doesn't go below 0
            const newProductQuantity = Math.max(newQuantity, 0);

            return { ...product, quantity: newProductQuantity };
          }
          return product;
        });
        return { ...wishlist, products: updatedProducts };
      }
      return wishlist;
    });

    // Update the cart on the server
    updateWishlistOnServer(wishlistId, updatedWishlists);

    // Update the state with the new carts
    setWishlists(updatedWishlists);
  };

  const updateWishlistOnServer = async (wishlistId, updatedCarts) => {
    try {
      const url = `http://64.23.187.18:8000/wishlist/${wishlistId}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      };

      // Extract the updated products from the frontend state
      const updatedProducts = updatedCarts.find(
        (wishlit) => wishlit.id === wishlistId
      ).products;

      const requestBody = {
        products: updatedProducts,
      };

      await axios.put(url, requestBody, { headers });
    } catch (error) {
      console.log(error.message);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  return (
    <div>
      <NavbarComponent />
      {wishlists.map((wishlist) => (
        <div key={wishlist.id}>
          <div>
            {wishlist.products.map((product) => (
              <div key={product.productId} className="order-alignment certain-order-wrapper">
                <div className="details-wrapper-product">
                  <Carousel
                    showArrows={true}
                    showStatus={false}
                    showThumbs={false}
                    dynamicHeight={false}
                    emulateTouch={true}
                    infiniteLoop={true}
                    autoPlay={true} // Set autoPlay to true
                    interval={2000} // Set the interval to 2 seconds
                  >
                    {product.productDetails.imageLinks.map((link, index) => (
                      <div key={index}>
                        <img
                          // style={{ height: "490px", width: "50%" }}
                          className="certain-img-style certain-prod-img"
                          src={link}
                          alt={`Product ${index + 1}`}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
                <div className="prod-details">
                  <p className="prod-det-dis">
                    Name: {product.productDetails.name}
                  </p>
                  <p className="prod-det-dis">
                    ${product.productDetails.price}
                  </p>
                  <p className="prod-det-dis">
                    Quantity:{" "}
                    <RemoveIcon
                      className="icon"
                      onClick={() =>
                        handleQuantityChange(wishlist.id, product.productId, -1)
                      }
                    />
                    {product.quantity}
                    <AddIcon
                      className="icon"
                      onClick={() =>
                        handleQuantityChange(wishlist.id, product.productId, 1)
                      }
                    />
                  </p>
                  <p className="prod-det-dis">
                    Description: {product.productDetails.description}
                  </p>
                  {/* <p className="prod-det-dis">
                    Ratings: {product.productDetails.ratings}
                  </p> */}
                  <Button
                    style={{
                      backgroundColor: "#000",
                      fontFamily: "Agbalumo, cursive",
                    }}
                    variant="contained"
                    onClick={() => handleWishlistDelete(wishlist.id)}
                  >
                    Delete &nbsp;
                    <DeleteIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistComponent;
