import axios from "../../axios";
import React, { useEffect, useReducer, useState } from "react";
import Navbar from "../Navbar";
import Footer2 from "../footer/Footer2";
import styled from "styled-components";
import ShopCard from "./ShopCard";
import { useParams } from "react-router-dom";
import reducers from "../../reducers";
import LoadingBox from "../loadings/LoadingBox";
import MessageBox from "../MessageBox";
import OptionMenu from "../OptionMenu";
import { FcNext, FcPrevious } from "react-icons/fc";
const Shop = () => {
  const param = useParams();
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const { cat } = param;
  const [{ loading, products, error }, dispatch] = useReducer(reducers, {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchdata = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          cat
            ? `/category/${cat}?page=${pageNumber}`
            : `/paginates/products?page=${pageNumber}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.allProducts });
        setNumberOfPages(result.data.totalPages);
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchdata();
  }, [cat, pageNumber]);

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
      <Container>
        <Navbar />
        <OptionMenu />
        <div className="container">
          <div className="d-flex justify-content-center align-items-center mt-5">
            {" "}
            <button className="btn btn-dark">YOUR SHOP</button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            {" "}
            <span className="text text-center">
              Finding Best Products Now
              <br /> in Your Fingertips
            </span>
          </div>

          {/**shop card*/}

          <div className="shop-cards">
            {products.map((items) => (
              <ShopCard item={items} />
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
      </Container>
      <Footer2 />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: rgb(234, 237, 237);
  max-width: 1400px;
  margin: auto;
  height: fit-content;
`;


export default Shop;
