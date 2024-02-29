import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "../navbarComponent/NavbarComponent";
import "./HomeComponent.styles.css";
import ProductsComponent from "../ProductsComponent/ProductsComponent";
import { logoutUser } from "../../Redux/authActions";
import FooterComponent from "../FooterComponent/FooterComponent";
import Button from "@mui/material/Button";

const HomeComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logoutUser());
    navigate("/login");
  };
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      {isAuthenticated ? (<NavbarComponent />) : null}
      <div className="home-page-wrapper">
        <div className="background-wrapper">
          <div className="text-wrapper">
            <h1>Welcome To ShopLyft</h1>
            <Link to={"/login"}>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              marginTop: "23px",
              fontFamily: "Edu TAS Beginner, cursive",
              backgroundColor: "rgb(214, 119, 178)", // Set the background color
            }}
          >
            
            Login
            
          </Button>
          </Link>
            {/* <h3>Shop Now</h3> */}
          </div>
        </div>
        <ProductsComponent />
        <FooterComponent />
      </div>
    </>
  );
};

export default HomeComponent;
