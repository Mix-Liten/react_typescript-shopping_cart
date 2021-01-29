import React from "react";
import Button from "@material-ui/core/Button";
// types
import { CartItemType } from "../types";
// styles
import { Wrapper } from "./CartItem.styles";

interface Props {
  itemData: CartItemType;
  add: (clickedItem: CartItemType) => void;
  remove: (id: number) => void;
}

const CartItem: React.FC<Props> = ({ itemData, add, remove }) => (
  <Wrapper>
    <div>
      <h3>{itemData.title}</h3>
      <div className="product">
        <p>Price: ${itemData.price}</p>
        <p>Total: ${(itemData.amount * itemData.price).toFixed(2)}</p>
      </div>
      <div className="btn-group">
        <Button
          size="small"
          variant="contained"
          disableElevation
          onClick={() => remove(itemData.id)}
        >
          -
        </Button>
        <p>{itemData.amount}</p>
        <Button
          size="small"
          variant="contained"
          disableElevation
          onClick={() => add(itemData)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={itemData.image} alt={itemData.title} />
  </Wrapper>
);

export default CartItem;
