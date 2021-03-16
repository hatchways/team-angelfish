import React, { useState } from "react";

import { useStateContext } from "../../context";

import { withStyles } from "@material-ui/core/styles";
import { IconButton, Drawer, Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import CartList from "./CartList";

const StyledBadge = withStyles(() => ({
  badge: {
    right: -3,
    top: 13,
    background: "#FFA000",
    padding: "0 4px",
  },
}))(Badge);

const Cart = () => {
  const { cart } = useStateContext();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const getCartLength = () => {
    let length = 0;
    if (cart?.flights.length > 0) length += 1;
    if (cart?.hotels.length > 0) length += 1;
    if (cart?.rentalCar.length > 0) length += 1;
    return length;
  };

  return (
    <>
      <IconButton onClick={handleToggle}>
        <StyledBadge badgeContent={getCartLength()}>
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <Drawer anchor="right" open={open} onClose={handleToggle}>
        <CartList closeCart={handleToggle} />
      </Drawer>
    </>
  );
};

export default Cart;
