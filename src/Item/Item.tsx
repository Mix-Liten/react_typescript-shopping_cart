import React from "react";
import Button from "@material-ui/core/Button";
// types
import { CartItemType } from "../types";
// styles
import { Wrapper } from "./Item.styles";

interface Props {
  itemData: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({ itemData, handleAddToCart }) => (
  <Wrapper>
    <img src={itemData.image} alt={itemData.title} />
    <div>
      <h3>{itemData.title}</h3>
      <p>{itemData.description}</p>
      <h3>${itemData.price}</h3>
    </div>
    <Button onClick={() => handleAddToCart(itemData)}>Add to cart</Button>
  </Wrapper>
);

export default Item;
