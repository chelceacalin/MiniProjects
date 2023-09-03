import React,{useContext,useState,useEffect} from "react";
import { shoppingContext } from "../context/ShoppingCartContext";
import {fetchData} from '../data/items';
import { dataProps } from "../model/DataPropx";
import {Stack,Button} from 'react-bootstrap'
interface CartItemProps {
  id: number;
  quantity: number;
  key: number;
}
function CartItem({ id, quantity }: CartItemProps) {
  const [data, setData] = useState<dataProps[]>([]);
    

  const {
   removeFromCart
  } = useContext(shoppingContext);

  useEffect(() => {
      fetchData().then((res) => {
          setData(res!.data!.photos);
      });
  }, []);
  

  const item = data.filter((item) => item.id === id)[0];
    
  if (!item) {
      return "Loading...";
  }
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
    <img
      src={item.url}
      style={{ width: "125px", height: "75px", objectFit: "cover" }}
    />
    <div className="me-auto">
      <div>
        {item.title.substring(0,30)}{" "}
        {quantity > 1 && (
          <span className="text-muted" style={{ fontSize: ".65rem" }}>
            x{item.user}
          </span>
        )}
      </div>
      <div className="text-muted" style={{ fontSize: ".75rem" }}>
        {(item.user)}
      </div>
    </div>
    <div> {(item.user * quantity)}</div>
    <Button
      variant="outline-danger"
      size="sm"
      onClick={() => removeFromCart(item.id)}
    >
      &times;
    </Button>
  </Stack>
);

}

export default CartItem;
