import { dataProps } from "../model/DataPropx";
import { Card, Container, Button } from "react-bootstrap";
import {shoppingContext} from "../context/ShoppingCartContext";
import {useContext} from 'react'
interface StoreItemProps {
  item: dataProps;
  getItemQuantity(id: number): number;
  increaseCartQuantity(id: number): void;
  decreaseCartQuantity(id: number): void;
  removeFromCart(id: number): void;
}

function StoreItem(props: StoreItemProps) {

  let { url, title, user,id } = props.item;
  const {getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart}=props
  const quantity = getItemQuantity(id);
  return (
    <>
      <Container style={{ marginBottom: 15 }}>
        <Card className="h-100">
          <Card.Img
            variant="top"
            src={url}
            height="400px"
            style={{ objectFit: "cover" }}
          ></Card.Img>
        </Card>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-2">{title}</span>
            <span className="ms-2 text-muted" style={{ marginRight: 10 }}>
              {user}$
            </span>
          </Card.Title>
        </Card.Body>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={()=>{
                        increaseCartQuantity(id)
            }}>+ Add To Cart</Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: "0.5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: "0.5rem" }}
              >
                <Button  onClick={()=>{
                decreaseCartQuantity(id);
            }}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span>
                  In Cart
                </div>
                <Button  onClick={()=>{
                increaseCartQuantity(id);
            }}>+</Button>
              </div>
              <Button variant="danger" size="sm"  onClick={()=>{
                removeFromCart(id);
            }}>
                Remove
              </Button>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default StoreItem;
