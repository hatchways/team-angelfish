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

  return (
    <>
      <IconButton onClick={handleToggle}>
        <StyledBadge badgeContent={cart.length}>
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <Drawer anchor="right" open={open} onClose={handleToggle}>
        <CartList />
      </Drawer>
    </>
  );
};

export default Cart;
