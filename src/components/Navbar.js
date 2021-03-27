import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [state, setState] = useState({
    menu: false,
    isOpen: false,
  });

  const [length, setLength] = useState(0);
  const toggleMenu = () => {
    setState({
      ...state,
      menu: !state.menu,
    });
  };
  const show = state.menu ? "show" : "";

  const productDataFromState = useSelector((state) => state.products);
  const { productData } = productDataFromState;

  const itemsInCart = useSelector((state) => state.cart);
  const { cartItems } = itemsInCart;

  useEffect(() => {
    let calculateSum = () => {
      let sum = cartItems.length;
      setLength(sum);
    };
    calculateSum();
  }, [itemsInCart, cartItems.length]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <Link className="navbar-brand" to="/">
        Home
      </Link>
      <button className="navbar-toggler" type="button" onClick={toggleMenu}>
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className={"collapse navbar-collapse " + show}
        style={{
          justifyContent: "space-between",
        }}
      >
        <div className="navbar-nav">
          {productData.map((productCategory, index) => {
            return (
              <Link
                className="nav-item nav-link"
                to={{
                  pathname: `/product/${productCategory.category}`,
                  state: { category: productCategory.category },
                }}
                key={index}
              >
                {productCategory.category}
              </Link>
            );
          })}
        </div>
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to="/checkout">
            My Cart
            <span
              style={{
                padding: "10px",
                color: "#fff",
                fontSize: "20px",
                fontWeight: "900",
              }}
            >
              {length}
            </span>
            items
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
