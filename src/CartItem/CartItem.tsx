import React from "react";
import Button from "@material-ui/core/Button";
// types
import { CartItemType } from "../types";
// styles
import { StyledWrapper } from "./CartItem.styles";

interface Props {
  product: CartItemType;
  add: (clickedItem: CartItemType) => void;
  remove: (id: number) => void;
}

const CartItem: React.FC<Props> = ({ product, add, remove }) => (
  <StyledWrapper>
    <div>
      <h3>{product.title}</h3>
      <div className="product">
        <p>Price: ${product.price}</p>
        <p>Total: ${(product.amount * product.price).toFixed(2)}</p>
      </div>
      <div className="btn-group">
        <Button
          size="small"
          variant="contained"
          disableElevation
          onClick={() => remove(product.id)}
        >
          -
        </Button>
        <p>{product.amount}</p>
        <Button
          size="small"
          variant="contained"
          disableElevation
          onClick={() => add(product)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={product.image} alt={product.title} />
  </StyledWrapper>
);

export default CartItem;
