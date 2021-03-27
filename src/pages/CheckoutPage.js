import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

import { useDispatch, useSelector } from "react-redux";
import {
  removeSingleItemFromCart,
  addItem,
  clearItemFromCart,
} from "../redux/reducers/cart/cartActions";

const CheckoutPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  //Get Cart Store
  const itemsInCart = useSelector((state) => state.cart);
  const { cartItems } = itemsInCart;

  useEffect(() => {
    let calculateSum = () => {
      let sum = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      setTotalPrice(sum);
    };
    calculateSum();
  }, [itemsInCart, cartItems]);

  return (
    <div>
      <Navbar />
      <div className="container" style={{ paddingTop: "100px" }}>
        <table className="table" style={{ textAlign: "center" }}>
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((cartItem, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      src={cartItem.image}
                      alt="IMG"
                      style={{
                        height: "50px",
                        width: "50px",
                      }}
                    />
                  </td>
                  <td>{cartItem.title}</td>
                  <td>${cartItem.price}</td>
                  <td>
                    <i
                      className="fa fa-minus"
                      onClick={() =>
                        dispatch(removeSingleItemFromCart(cartItem))
                      }
                      style={{ paddingRight: "15px", cursor: "pointer" }}
                    ></i>{" "}
                    {cartItem.quantity}
                    <i
                      className="fa fa-plus"
                      onClick={() => dispatch(addItem(cartItem))}
                      style={{ paddingLeft: "15px", cursor: "pointer" }}
                    ></i>
                  </td>
                  <td>${cartItem.price * cartItem.quantity}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => dispatch(clearItemFromCart(cartItem))}
                    >
                      Rmove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          style={{
            textAlign: "right",
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            padding: "20px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              paddingRight: "10px",
              fontWeight: "600",
            }}
          >
            Total Amount: ${totalPrice}
          </div>
        </div>
        <div
          style={{
            padding: "20px",
            textAlign: "right",
          }}
        >
          <button type="button" className="btn btn-success">
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
