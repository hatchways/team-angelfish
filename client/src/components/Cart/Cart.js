import React, { useState } from "react";

import { useStateContext, useDispatchContext } from "../../context";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Drawer } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles({
  cartContainer: {
    width: 250,
  },
});

const Cart = () => {
  const { cart } = useStateContext();
  const dispatch = useDispatchContext();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const removeFromCart = (ind) => {
    dispatch({ type: "REMOVE_FROM_CART", index: ind });
  };

  const list = () => (
    <div className={classes.cartContainer}>
      <p>Count:{cart.length}</p>
      {cart.map((i, ind) => (
        <div key={ind}>
          <p>{i.name}</p>
          <button onClick={() => removeFromCart(ind)}>x</button>
        </div>
      ))}
    </div>
  );
  return (
    <div>
      <IconButton onClick={handleToggle}>
        <ShoppingCartIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={handleToggle}>
        {list()}
      </Drawer>
    </div>
  );
};

export default Cart;
