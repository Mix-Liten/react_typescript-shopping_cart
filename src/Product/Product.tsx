import React from "react";
import Button from "@material-ui/core/Button";
// types
import { CartItemType } from "../types";
// styles
import { StyledWrapper } from "./Product.styles";

interface Props {
  data: CartItemType;
  handleAddToCart: (product: CartItemType) => void;
}

const Product: React.FC<Props> = ({ data, handleAddToCart }) => (
  <StyledWrapper>
    <img src={data.image} alt={data.title} />
    <div>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <h3>${data.price}</h3>
    </div>
    <Button onClick={() => handleAddToCart(data)}>Add to cart</Button>
  </StyledWrapper>
);

export default Product;
