import { useState, createContext, useContext, useEffect } from "react";
//import axios from "axios";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
/* 
   //axios configuration
  axios.defaults.baseURL= process.env.REACT_APP_API;
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsed = JSON.parse(data);
      setAuth({ ...auth, user: parsed.user, token: parsed.token });
    }
  }, []);
 */

  useEffect(()=>{
    let existingCart = localStorage.getItem("cart");
    if(existingCart) setCart(JSON.parse(existingCart));
  })
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}; 

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
