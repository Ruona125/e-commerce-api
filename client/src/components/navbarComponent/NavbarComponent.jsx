import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MailIcon from "@mui/icons-material/Mail";
import "./NavbarStyles.css";
import { setTotalCarts } from "../../Redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/authActions";
import { useNavigate } from "react-router-dom";
import AppIcon from "../../assets/APP ICON-10.png"

const NavbarComponent = () => {
  const [clicked, setClicked] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartTotalCarts = useSelector((state) => state.cart.totalCarts); // Get the cart count from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logoutUser());
    navigate("/login");
  };

  useEffect(() => {
    const url = `http://64.23.187.18:8000/cart/${user._id}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    axios
      .get(url, { headers })
      .then((response) => {
        const totalCarts = response.data[0].totalCarts;
        // console.log("total carts:", totalCarts)
        dispatch(setTotalCarts(totalCarts)); // Update Redux state with cart count
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [user._id, dispatch]);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div>
      <nav>
        {/* <ShoppingCartIcon /> */}
        <img className="app-icon" src={AppIcon} alt="ShopLyft" />
        <p className="app-name" style={{color:"#fff"}}>ShopLyft</p>
        <div>
          <ul id="navbar" className={clicked ? "#navbar active" : "navbar"}>
            <li>
              <a href="/home">Hair</a>
            </li>
            <li>
              <a href="/gift-boxes">Gift Boxes</a>
            </li>
            <li>
              <a href="/hair-creams">Hair Creams</a>
            </li>
            {
              isAuthenticated ? (
                <li>
              <a href="/carts">
                <Badge badgeContent={cartTotalCarts} color="secondary">
                  <ShoppingCartIcon color="#fff" />
                </Badge>
              </a>
            </li>
              ) : null
            }
            
            <li>
              <a href="/wishlists">

                  <FavoriteBorderIcon color="#fff" />
              </a>
            </li>
            <li>
              <a href="/order">
                orders
              </a>
            </li>
            <li>
              {/* <a href="#">{isAuthenticated ? 'logout' : 'login'}</a> */}
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>

        <div id="mobile" onClick={handleClick}>
          {clicked ? (
            <CloseIcon className="fas fa-bars open" />
          ) : (
            <MenuIcon className="fas fa-bars open" />
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;
