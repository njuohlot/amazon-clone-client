import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Address from "./Components/Address";
import Checkout from "./Components/Checkout";

import Home from "./Components/Home";
import Login from "./Components/Login";
import Payment from "./Components/Payment";
import SignUp from "./Components/SignUp";
import Shop from "./Components/shop/Shop";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Product from "./Components/singleproduct/Product";

import Success from "./Components/Success";
import PlaceOrder from "./Components/placeOrder";
import OrderHistory from "./Components/OrderHistory";
import Order from "./Components/Order";
import ProtectedRoute from "./Components/ProtectedRoute";

const promise = loadStripe(
  "pk_test_51LEPZQJr1sv3s4wEBjprZAAoJ19NOzv4OYw7TMNILw2n6yaAtE9wqc0eExzSjl3XCmHzUP1tMCliOFXZsRcS6nDU00sFQyyyC1"
);
function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/address" element={<Address />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:cat" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/success" element={<Success />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />

          <Route
            path="/orderhistory"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
