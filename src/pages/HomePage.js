import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addItem,
  clearItemFromCart,
} from "./../redux/reducers/cart/cartActions";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const dispatch = useDispatch();

  const [allProducts, setAllProducts] = useState(null);
  const [prodCount, setProdCount] = useState(3);
  const [productName, setProductName] = useState("");
  const [minimumPrice, setMinimumPrice] = useState(1);
  const [maximumPrice, setMaximumPrice] = useState(100000);

  //Get Products Store
  const productDataFromState = useSelector((state) => state.products);
  const { productData } = productDataFromState;

  //Get Cart Store
  const itemsInCart = useSelector((state) => state.cart);
  const { cartItems } = itemsInCart;

  //Buton to render
  let findButton = (product, pi) => {
    let result = cartItems.filter((word) => word.id === pi);
    if (result.length === 0) {
      return (
        <button
          type="button"
          className="btn btn-success"
          style={{ width: "90%" }}
          onClick={() => dispatch(addItem(product))}
        >
          Add To Cart
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-danger"
          style={{ width: "90%" }}
          onClick={() => dispatch(clearItemFromCart(product))}
        >
          Remove From Cart
        </button>
      );
    }
  };

  useEffect(() => {
    setAllProducts(productData);
  }, [productData, productDataFromState]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "20px",
        }}
      >
        <form className="form-inline" onSubmit={handleSubmit}>
          <div style={{ marginLeft: "auto" }}>
            <input
              className="form-control mr-sm-2"
              placeholder="Search by name"
              aria-label="Search"
              type="text"
              name="productName"
              onChange={(event) => setProductName(event.target.value)}
            />

            <input
              className="form-control mr-sm-2"
              placeholder="Minimum Price"
              aria-label="Search"
              type="text"
              name="minimumPrice"
              onChange={(e) => setMinimumPrice(e.target.value * 1)}
            />

            <input
              className="form-control mr-sm-2"
              placeholder="Mazimum Price"
              aria-label="Search"
              type="text"
              name="maximumPrice"
              onChange={(e) => setMaximumPrice(e.target.value * 1)}
            />
          </div>
        </form>
      </div>

      <div className="container">
        {allProducts &&
          allProducts.map((products, index) => {
            return (
              <React.Fragment key={index}>
                <div>
                  <h1
                    style={{
                      textAlign: "center",
                      fontSize: "50px",
                      textTransform: " uppercase",
                      padding: "30px",
                      borderBottom: "1px solid black",
                    }}
                  >
                    {products.category}
                  </h1>
                </div>
                <div className="row">
                  {products.data &&
                    products.data.slice(0, prodCount).map((product, index) => {
                      {
                        if (productName === "") {
                          return (
                            <div
                              className="col-md-4"
                              style={{
                                textAlign: "-webkit-center",
                                paddingTop: "20px",
                              }}
                              key={index}
                            >
                              <div
                                className="card"
                                style={{ width: "18rem", marginBottom: "20px" }}
                              >
                                <img
                                  className="card-img-top"
                                  src={product.image}
                                  alt="Card"
                                  style={{ height: "200px" }}
                                />
                                <div
                                  className="card-body"
                                  style={{ textAlign: "center" }}
                                >
                                  <p className="card-text">{product.title} </p>
                                  <p className="card-text">${product.price} </p>
                                </div>
                                <div
                                  className="card-footer text-muted"
                                  style={{ textAlign: "center" }}
                                >
                                  {findButton(product, product.id)}
                                </div>
                              </div>
                            </div>
                          );
                        } else if (
                          productName !== "" &&
                          product.title === productName &&
                          product.price * 1 >= minimumPrice &&
                          product.price * 1 <= maximumPrice
                        ) {
                          return (
                            <div
                              className="col-md-4"
                              style={{
                                textAlign: "-webkit-center",
                                paddingTop: "20px",
                              }}
                              key={index}
                            >
                              <div
                                className="card"
                                style={{ width: "18rem", marginBottom: "20px" }}
                              >
                                <img
                                  className="card-img-top"
                                  src={product.image}
                                  alt="Card"
                                  style={{ height: "200px" }}
                                />
                                <div
                                  className="card-body"
                                  style={{ textAlign: "center" }}
                                >
                                  <p className="card-text">{product.title} </p>
                                  <p className="card-text">${product.price} </p>
                                </div>
                                <div
                                  className="card-footer text-muted"
                                  style={{ textAlign: "center" }}
                                >
                                  {findButton(product, product.id)}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      }
                    })}
                </div>
                <div
                  style={{
                    textAlign: "center",
                    padding: "50px",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setProdCount(prodCount + 3)}
                  >
                    View More
                  </button>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
};

export default HomePage;
