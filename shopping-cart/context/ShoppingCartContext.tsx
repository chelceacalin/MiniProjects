import { useState, createContext, PropsWithChildren } from "react";
import ShoppingCart from "../components/ShoppingCart"
import {useLocalStorage} from '../hooks/useLocalStorage';
interface ShoppingCartContextProps {
  openCart(): void;
  closeCart(): void;
  getItemQuantity(id: number): number;
  increaseCartQuantity(id: number): void;
  decreaseCartQuantity(id: number): void;
  removeFromCart(id: number): void;
  cartQuantity: number;
  cartItems: CartItem[];
}
interface CartItem {
  id: number;
  quantity: number;
}

export const shoppingContext = createContext({} as ShoppingCartContextProps);

function ShoppingCartContext({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shoppingCart",[]);
  const [isOpen,setIsOpen]=useState<boolean>(false)

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart=()=>{
    setIsOpen(true)
  }

  const closeCart=()=>{
    setIsOpen(false)
  }

  const getItemQuantity = (id: number): number => {
    return cartItems.find((item) => item.id == id)?.quantity || 0;
  };
  const increaseCartQuantity = (id: number): void => {
    if (
      cartItems.filter((elem) => elem.id !== id).length === cartItems.length
    ) {
      setCartItems((currItems) => [...currItems, { id, quantity: 1 }]);
    } else {
      setCartItems(
        cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        })
      );
    }
  };
  const decreaseCartQuantity = (id: number): void => {
    setCartItems((currItems: CartItem[]) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeFromCart = (id: number): void => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  return (
    <shoppingContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen}/>
    </shoppingContext.Provider>
  );
}

export default ShoppingCartContext;
