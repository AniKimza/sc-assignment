import { ReactComponent as Logo } from "../../logo.svg"
import { ReactComponent as Cart } from "../../cart.svg"
import { useCartOverLayContext } from "../../state/CartOverlay"

export const Nav = ({ children, }) => {
  const { toggleCartPopupOpen } = useCartOverLayContext();
  return (
    <nav className="flex justify-between pt-4 px-[8vw]">
      <ul className="flex gap-4">
        {children}
      </ul>
      <Logo />
      <button onClick={toggleCartPopupOpen} className="relative" data-testid="cart-btn">
        <Cart />
      </button>
    </nav>
  )
}


