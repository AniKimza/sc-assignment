import { createContext, useContext, useState } from "react";
const CartOverLayContext = createContext();

export const CartOverLayContextProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const toggleCartPopupOpen = () => {
    setIsCartOpen((prev) => !prev)
  }
  return (
    <CartOverLayContext.Provider value={{ isCartOpen, setIsCartOpen, toggleCartPopupOpen }}>
      {children}
    </CartOverLayContext.Provider>
  )
}
export const useCartOverLayContext = () => useContext(CartOverLayContext);
