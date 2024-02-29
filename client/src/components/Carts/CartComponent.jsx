import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import NavbarComponent from "../navbarComponent/NavbarComponent";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { decrement } from "../../Redux/cartSlice";
import { calculateMainTotal } from "../../utils/utils";
import StripeCheckout from "react-stripe-checkout";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import "./CartComponentStyles.css";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
const CartComponent = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.count);
  const mainTotal = calculateMainTotal(carts);

  const navigate = useNavigate();

  useEffect(() => {
    const url = `http://64.23.187.18:8000/cart/${user._id}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    axios
      .get(url, { headers })
      .then((response) => {
        console.log(response.data);
        setCarts(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [user._id]); // Include user._id as a dependency to re-fetch when the user changes.

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

  if (!carts.cartDetails || carts.cartDetails.length === 0) {
    return (
      <>
        <NavbarComponent />
        <div className="no-products-message">
          <center>
            <p className="no-prod-message">No Items in cart</p>
          </center>
        </div>
      </>
    );
  }

  const handleCreateOrder = () => {
    // Create an array to store the products from the cart
    const orderProducts = [];

    if (carts.cartDetails && carts.cartDetails.length > 0) {
      carts.cartDetails.forEach((cartDetails) => {
        if (cartDetails.products) {
          cartDetails.products.forEach((product) => {
            orderProducts.push({
              productId: product.productDetails._id, // Assuming _id is the product's unique identifier
              quantity: product.quantity,
            });
          });
        }
      });
    }

    // Create an order object to send to the server
    const orderData = {
      userId: user._id,
      products: orderProducts,
    };

    // Send a POST request to your order API to create the order
    axios
      .post("http://64.23.187.18:8000/order", orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // Handle a successful order creation (you may want to show a success message)
        console.log("Order created successfully!", response.data);
      })
      .catch((error) => {
        console.log(error.message);
        // Handle the error, e.g., show an error message to the user.
      });
  };

  //this is for the payment
  const onToken = (token) => {
    const amount = mainTotal * 100; // Amount in cents
    const description = "Purchase Description";

    fetch("http://64.23.187.18:8000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, amount, description }),
    }).then((response) => {
      if (response.status === 200) {
        // setPaymentCompleted(true);
        navigate("/order");
        handleCreateOrder();
      }
    });
  };

  const handleDeleteCart = (cartId) => {
    axios
      .delete(`http://64.23.187.18:8000/cart/${cartId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        // Update the state after a successful delete request
        const updatedCarts = carts.cartDetails.filter(
          (cart) => cart.id !== cartId
        );
        setCarts((prevCarts) => ({ ...prevCarts, cartDetails: updatedCarts }));
        dispatch(decrement());
      })
      .catch((error) => {
        console.log(error.message);
        // Handle the error, e.g., show an error message to the user.
      });
  };

  const handleQuantityChange = (cartId, productId, quantityChange) => {
    const updatedCarts = carts.cartDetails.map((cartDetail) => {
      if (cartDetail.id === cartId) {
        const updatedProducts = cartDetail.products.map((product) => {
          if (product.productId === productId) {
            const newQuantity = product.quantity + quantityChange;
            const newProductQuantity = Math.max(newQuantity, 0);
            return { ...product, quantity: newProductQuantity };
          }
          return product;
        });
        return { ...cartDetail, products: updatedProducts };
      }
      return cartDetail;
    });

    // Attempt to update the cart on the server
    updateCartOnServer(cartId, updatedCarts)
      .then(() => {
        // Update the state after a successful update
        setCarts((prevCarts) => ({ ...prevCarts, cartDetails: updatedCarts }));
      })
      .catch((error) => {
        console.log(error.message);
        // Handle the error, e.g., show an error message to the user.
      });
  };

  //this is the one that doesn't console.log error
  const updateCartOnServer = (cartId, updatedCarts) => {
    const url = `http://64.23.187.18:8000/cart/${cartId}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };

    const updatedProducts = updatedCarts.find(
      (cart) => cart.id === cartId
    ).products;
    const requestBody = {
      products: updatedProducts,
    };

    return axios.put(url, requestBody, { headers });
  };

  return (
    <div>
      <NavbarComponent />
      <div>
        <center>
        <h3>Carts</h3>
        </center>
        {carts.cartDetails && carts.cartDetails.length > 0 ? (
          carts.cartDetails.map((cartDetails) => (
            <div key={cartDetails.id}>
              {cartDetails.products.map((product) => (
                <div key={product.productId} className="order-alignment certain-order-wrapper">
                  <div className="details-wrapper-product">
                    <Carousel
                      showArrows={true}
                      showStatus={false}
                      showThumbs={false}
                      dynamicHeight={false}
                      emulateTouch={true}
                      infiniteLoop={true}
                      autoPlay={true}
                      interval={2000}
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
                          handleQuantityChange(
                            cartDetails.id,
                            product.productId,
                            -1
                          )
                        }
                      />
                      {product.quantity}
                      <AddIcon
                        className="icon"
                        onClick={() =>
                          handleQuantityChange(
                            cartDetails.id,
                            product.productId,
                            1
                          )
                        }
                      />
                    </p>
                    <p className="prod-det-dis">
                      sub total: $
                      {product.quantity * product.productDetails.price}
                    </p>{" "}
                    {/* come back and fix this code later */}
                    <p className="prod-det-dis">
                      Description: {product.productDetails.description}
                    </p>
                    {/* <p className="prod-det-dis">
                      Ratings: {product.productDetails.ratings}
                    </p> */}
                    {/* <p className="prod-det-dis del-icon"  onClick={() => handleDeleteCart(cartDetails.id)}> Delete
                    <DeleteIcon
                    />
                    </p> */}
                    <Button
                      onClick={() => handleDeleteCart(cartDetails.id)}
                      style={{
                        backgroundColor: "#000",
                        fontFamily: "Agbalumo, cursive",
                      }}
                      variant="contained"
                    >
                      Delete &nbsp;
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No cart details available.</p>
        )}
        <div className="prod-status">
          <p className="prod-det-dis">Main Total: ${mainTotal}</p>
          <Button
            style={{
              backgroundColor: "#000",
              fontFamily: "Agbalumo, cursive",
            }}
            variant="contained"
          >
            <StripeCheckout
              token={onToken}
              //this is for toby below
              // stripeKey="pk_test_51O895PB4KCmK38l3pVaa7egnIxfaUdquKurcznmu5a0ZHmTSo8ZT0DZ6Eqg5IyU76M89xkxF3m2D3cXIz6RdGqVB00LcMfiH9u"
              //this is for you below
              stripeKey="pk_test_51JqdR4GtNhHP2MJKDVgOZjeeYZypmfio8tz0KajoalMGBMLoEpqZP8Y0YtQzabWxkhlhPLbiqGLekfadlPKmAPeI00a6LdNakJ"
              name="Your Company Name"
              shippingAddress
              billingAddress
              zipCode
              description="Purchase Description"
              amount={mainTotal * 100} // Amount in cents
              currency="CAD"
            >
              pay
            </StripeCheckout>
          </Button>
        </div>
        <br />
      </div>
    </div>
  );
};

export default CartComponent;
