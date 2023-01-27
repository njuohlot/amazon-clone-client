import axios from "../axios";
import React, { useEffect, useReducer, useState } from "react";
import Footer from "./footer/Footer";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Card from "./Card";
import Navbar from "./Navbar";
import Newsletter from "./Newsletter";
import CategoryReducer from "../CategoryReducer";
import Slider from "./Slider";
import LoadingBox from "./loadings/LoadingBox";
import MessageBox from "./MessageBox";
import OptionMenu from "./OptionMenu";
import { FcNext, FcPrevious } from "react-icons/fc";
function Home() {
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const [{ loading, categories, error }, dispatch] = useReducer(
    CategoryReducer,
    {
      loading: true,
      categories: [],
      error: "",
    }
  );

  useEffect(() => {
    const categoryFetch = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/paginates/categories?page=${pageNumber}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.allCategory});
        setNumberOfPages(result.data.totalPages);
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    categoryFetch();
  }, [pageNumber]);
  const goNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  const goPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
     
        <Navbar />
        <OptionMenu />
        <Slider />
        <Banner>
          <div className="desc">
            <h1>SUMMER SALE</h1>
            <p>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
            <Link to="/shop">
              <button>SHOP NOW</button>
            </Link>
          </div>
        </Banner>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center mt-5">
            {" "}
            <button className="btn btn-dark">OUR CATEGORIES</button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            {" "}
            <span className="text text-center">
              Finding Best Products Now
              <br /> in Your Fingertips
            </span>
          </div>
          
             <div className="category-cards">
             {categories.map((item) => (
              <Card item={item} key={item.id} />
            ))}
             </div>
             

       
          
        </div>
        <div className="paginate">
          <FcPrevious size={25} onClick={goPrevious}/>
          {pages.map((pageIndex) => (
            <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
              {pageIndex + 1}
            </button>
          ))}

         <FcNext size={25} onClick={goNext}/>
        </div>
      
      <Newsletter />
      <Footer />
    </>
  );
}

const Banner = styled.div`
  width: 103%;
  background: url('https://i.ibb.co/DG69bQ4/2.png');
  height: 60vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
 
    @media only screen and (min-width: 767px) {
     display: none;
    }
  }
`;

export default Home;
