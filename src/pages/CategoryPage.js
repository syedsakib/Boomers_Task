import React from "react";
import Navbar from "../components/Navbar";

import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  clearItemFromCart,
} from "./../redux/reducers/cart/cartActions";

const CategoryPage = (props) => {
  const dispatch = useDispatch();

  //Get Products From Store
  const productDataFromState = useSelector((state) => state.products);
  const { productData } = productDataFromState;

  //Get Cart Store
  const itemsInCart = useSelector((state) => state.cart);
  const { cartItems } = itemsInCart;

  //Filter  Category To Render
  const resultedCategory = productData.filter(
    (word) => word.category === props.match.params.category
  );

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

  return (
    <div>
      <Navbar />
      <div className="container">
        {resultedCategory.map((products, index) => {
          return (
            <React.Fragment key={index}>
              <div>
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "50px",
                    textTransform: " uppercase",
                    padding: "30px",
                  }}
                >
                  {products.category}
                </h1>
              </div>
              <div className="row">
                {products.data.map((product, index) => {
                  return (
                    <div
                      className="col-md-4"
                      style={{ textAlign: "-webkit-center" }}
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
                })}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
