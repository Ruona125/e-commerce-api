import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import "./certain-products-styles.css";
import FooterComponent from "../FooterComponent/FooterComponent";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const CertainProductComponent = () => {
  const { id } = useParams();
  const [certainProducts, setCertainProduct] = useState([]);
  const [ratings, setRatings] = useState("");
  const [reviews, setReviews] = useState([]);
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(() => {
    const url = `http://64.23.187.18:8000/product/${id}`;
    axios.get(url).then((response) => {
      setCertainProduct(response.data);
      console.log(response.data);
    });

    const fetchRating = async () => {
      try {
        const apiUrl = `http://64.23.187.18:8000/rating/${id}`;
        const headers = {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        };
        const response = await axios.get(apiUrl, { headers });
        setRatings(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const apiUrl = `http://64.23.187.18:8000/review/${id}`;
        const headers = {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        };
        const response = await axios.get(apiUrl, { headers });
        setReviews(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };

    fetchRating()
    fetchReviews()
  }, [id]);
  return (
    <div style={{height: "100vh"}}>
      <center>
        <h3 className="prod-heading">{certainProducts.name}</h3>
      </center>

      <div className="order-alignment certain-order-wrapper">
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
            {certainProducts.imageLinks?.map((link, index) => (
              <div key={index}>
                <img
                  className="certain-img-style certain-prod-img"
                  src={link}
                  alt={`hair-${index}`}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="prod-details certain-prod-container">
          <p className="prod-det-dis">Name: {certainProducts.name}</p>
          <p className="prod-det-dis">Price: ${certainProducts.price}</p>
          <p className="prod-det-dis">ratings: {ratings.averageRating}</p>
          <p className="prod-det-dis">Description: {certainProducts.description}</p>
          {reviews.map((review) => (
            <div key={review._id}>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <h3 className="prod-det-dis review-header">Reviews</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <p className="prod-det reviews">
                    <ol>
                      <li>{review.reviews}</li>
                    </ol>
                  </p>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default CertainProductComponent;
