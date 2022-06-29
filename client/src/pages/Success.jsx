//import { useEffect, useState } from "react";
//import { useSelector } from "react-redux";
import { useLocation } from "react-router";
//import { userRequest } from "../requestMethods";

const Success = () => {
  const location = useLocation();
  console.log(location);
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  //const data = location.state.stripeData;
  //const cart = location.state.cart;
  //const currentUser = useSelector((state) => state.user.currentUser);
  //const [orderId, setOrderId] = useState(null);

  return (
    <div>
      successfull
    </div>
  );
};

export default Success;