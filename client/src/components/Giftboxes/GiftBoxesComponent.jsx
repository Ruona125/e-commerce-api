import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux/es";
import { Link } from "react-router-dom";
import { increment } from "../../Redux/cartSlice";
import { Carousel } from "react-responsive-carousel";
import CircularProgress from "@mui/material/CircularProgress";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import NavbarComponent from "../navbarComponent/NavbarComponent";
import Box from "@mui/material/Box";
import FooterComponent from "../FooterComponent/FooterComponent";

const GiftBoxesComponent = () => {
  const [products, setProducts] = useState([]);
  const [cartButtonTexts, setCartButtonTexts] = useState({});
  const [wishlistButtonTexts, setWishlistButtonTexts] = useState({});
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.count);

  useEffect(() => {
    const url = "http://64.23.187.18:8000/giftboxes";
    axios.get(url).then((response) => {
      setProducts(response.data);
      setLoading(false)
    });
  }, []);

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

  const addToCart = (productId) => {
    const url = "http://64.23.187.18:8000/cart"; // Replace with your actual API endpoint.
    const requestData = {
      userId: user._id,
      products: [{ productId }],
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };

    axios
      .post(url, requestData, { headers })
      .then((response) => {
        // Handle success, e.g., show a success message or update the UI.
        console.log("Product added to the cart:", response.data);
        dispatch(increment());

        setCartButtonTexts((prevTexts) => ({
          ...prevTexts,
          [productId]: "Item added to cart",
        }));

        setTimeout(() => {
          setCartButtonTexts((prevTexts) => ({
            ...prevTexts,
            [productId]: undefined, // Reset to undefined or an empty string
          }));
        }, 3000);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message.
        console.error("Error adding product to cart:", error);
      });
  };

  const addToWishlist = (productId) => {
    const url = "http://64.23.187.18:8000/wishlist"; // Replace with your actual API endpoint.
    const requestData = {
      userId: user._id,
      products: [{ productId }],
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };

    axios
      .post(url, requestData, { headers })
      .then((response) => {
        // Handle success, e.g., show a success message or update the UI.
        console.log("Product added to the wishlist:", response.data);

        setWishlistButtonTexts((prevTexts) => ({
          ...prevTexts,
          [productId]: "Item added to wishlist",
        }));

        setTimeout(() => {
          setWishlistButtonTexts((prevTexts) => ({
            ...prevTexts,
            [productId]: undefined, // Reset to undefined or an empty string
          }));
        }, 3000);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message.
        console.error("Error adding product to wishlist:", error);
      });
  };
  return (
    <div style={{ textAlign: "center", height: "100vh" }}>
      {/* <p>{user.email}</p> */}
      <h3>Gift Boxes</h3>
      <br />
      <div className="product-container-with-products">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <div className="details-wrapper">
              {/* <Link to={`/product/${product._id}`}> */}
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
                {product.imageLinks.map((link, index) => (
                    <Link key={index} to={`/product/${product._id}`}>
                  <div key={index}>
                    <img
                      width="20px"
                      height="200px"
                      src={link}
                      alt={`Product ${index + 1}`}
                    />
                  </div>
                  </Link>
                ))}
              </Carousel>
              <p className="func-button-details">Name: {product.name}</p>
              <p className="func-button-details">${product.price}</p>
              <br />
              {isAuthenticated ? (
                <>
                  <p
                    className="func-button"
                    onClick={() => addToCart(product._id)}
                  >
                   {cartButtonTexts[product._id] || "Add to cart"}
                  </p>
                  <br />
                  <br />
                  <p
                    className="func-button"
                    onClick={() => addToWishlist(product._id)}
                  >
                    {wishlistButtonTexts[product._id] || "Add to wishlist"}
                  </p>
                </>
              ) : null}
              {/* <p>ratings: {product.ratings}</p> */}
            </div>
            {/* </Link> */}
          </div>
        ))}
      </div>
      <FooterComponent />
    </div>
  );
};

export default GiftBoxesComponent;
