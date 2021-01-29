import React, { useState } from "react";
import { useQuery } from "react-query";
// custom components
import Product from "./Product";
import Cart from "./Cart";
// library components
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
// styles
import { StyledWrapper, StyledButton } from "./App.styles";
// types
import { CartItemType } from "./types";

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const getTotalItems = (cartItems: CartItemType[]) =>
    cartItems.reduce(
      (accumulator: number, cartItem: CartItemType) =>
        accumulator + cartItem.amount,
      0
    );
  const handleAddToCart = (product: CartItemType) =>
    setCartItems((prev) => {
      // 1. Product is already in the cart
      const isCartItemExist = prev.find(
        (cartItem) => cartItem.id === product.id
      );
      if (isCartItemExist) {
        return prev.map((cartItem) =>
          cartItem.id === product.id
            ? { ...cartItem, amount: cartItem.amount + 1 }
            : cartItem
        );
      }
      // 2. First time add product
      return [...prev, { ...product, amount: 1 }];
    });
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((accumulator, current) => {
        if (current.id === id) {
          if (current.amount === 1) return accumulator;
          return [...accumulator, { ...current, amount: current.amount - 1 }];
        }
        return [...accumulator, current];
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <StyledWrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((productData) => (
          <Grid item key={productData.id} xs={12} sm={4}>
            <Product data={productData} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </StyledWrapper>
  );
}

export default App;
