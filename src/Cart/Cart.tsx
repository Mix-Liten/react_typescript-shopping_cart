import React from "react";
import CartItem from "../CartItem";
// types
import { CartItemType } from "../types";
// styles
import { Wrapper } from "./Cart.styles";

interface Props {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const cartItemsSize = (cartItems: CartItemType[]) =>
    cartItems.reduce(
      (accumulator: number, cartItem: CartItemType) =>
        accumulator + cartItem.price * cartItem.amount,
      0
    );
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          itemData={cartItem}
          add={addToCart}
          remove={removeFromCart}
        />
      ))}
      <h2>Total: ${cartItemsSize(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
