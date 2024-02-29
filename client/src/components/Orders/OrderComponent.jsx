import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "../navbarComponent/NavbarComponent";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import "./OrderComponentStyle.css"

const OrderDetails = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Replace with your actual API endpoint
    const apiUrl = `http://64.23.187.18:8000/find/${user._id}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    axios
      .get(apiUrl, { headers })
      .then((response) => {
        setOrderData(response.data)
        console.log(response.data)
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching order data:", error));
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
        <CircularProgress style={{ color: 'rgb(214, 119, 178)'}} />
      </Box>
    );
  }

  if (orderData.length === 0) {
    return (
      <>
      <NavbarComponent />
      <div className="no-products-message">
        <center>
        <p className="no-prod-message">No orders available</p>
        </center>
      </div>
      </>
    );
  }

  return (
    <div>
      <center>
      <h3>Orders</h3>
      </center>
      {orderData.map((order, index) => (
        <div key={index}>
          {/* <h2>Order for User: {order.userId}</h2> */}

          <div>
            {order.products.map((product, productIndex) => (
              <div key={productIndex} className="order-alignment certain-order-wrapper">
                <div className="details-wrapper-product">
                  {/* <h4>Product {productIndex + 1}</h4> */}
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
                  <p className="prod-det-dis">Product Name: {product.productDetails.name}</p>
                  <p className="prod-det-dis">Quantity: {product.quantity}</p>
                  <p className="prod-det-dis">Price per Unit: ${product.productDetails.price}</p>
                  {/* <p>SubTotal: ${product.subTotal}</p> */}
                  {/* Add other product details as needed */}
                </div>
              </div>
            ))}
          </div>
          <div className="prod-status">
          <h4>Main Total: ${order.mainTotal}</h4>
          <h4>Status: {order.status}</h4>
          <h4>Delivery Date: {moment(order.delivery).format("DD-MM-YYYY")}</h4>
          <hr />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
