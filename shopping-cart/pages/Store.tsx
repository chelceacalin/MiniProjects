import { useState, useEffect, useContext } from "react";
import { fetchData } from "../data/items"; // Make sure to update this import to match your folder structure
import { Row, Col, Container } from "react-bootstrap";
import { dataProps } from "../model/DataPropx";
import StoreItem from "../components/StoreItem";
import { shoppingContext } from "../context/ShoppingCartContext";

function Store() {
  const [data, setData] = useState<dataProps[]>([]);
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useContext(shoppingContext);

  useEffect(() => {
    fetchData().then((mydata) => {
      let received: dataProps[] = mydata!.data!.photos;
      setData(received);
    });
  }, []);

  return (
    <>
      <Container style={{ fontWeight: "bold", fontSize: 32 }}>
        <div>Store</div>
      </Container>
      <Row md={1} lg={1}>
        {data?.map((item: dataProps) => (
          <Col key={item.id}>
            <StoreItem
              item={{ ...item }}
              getItemQuantity={getItemQuantity}
              increaseCartQuantity={increaseCartQuantity}
              decreaseCartQuantity={decreaseCartQuantity}
              removeFromCart={removeFromCart}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
