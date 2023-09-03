import React,{useContext,useState} from 'react'
import {Offcanvas,Stack} from 'react-bootstrap'
import { shoppingContext } from "../context/ShoppingCartContext";
import CartItem from './CartItem';
interface ShoppingProps{
    isOpen:boolean;
}

function ShoppingCart({isOpen}:ShoppingProps) {

    const {
       openCart,closeCart,cartItems
      } = useContext(shoppingContext);

      console.log(cartItems)
  return (
    <Offcanvas show={isOpen} placement='end' data-bs-dismiss="offcanvas"   onHide={closeCart}>
        <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>

        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
        {
            cartItems.map((item)=>{
                return (<CartItem key={item.id} {...item} />)
            })
        }
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart