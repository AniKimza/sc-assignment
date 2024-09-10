import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";
import { ReactComponent as Cart } from "../../cart.svg"
import { useCart } from "react-use-cart";
import { useCartOverLayContext } from '../../state/CartOverlay'

export const ProductCard = ({ id, img, name, price, currency, inStock }) => {
  const { addItem } = useCart()
  const { setIsCartOpen } = useCartOverLayContext()
  return (
    <Link to={`/products/${id}`}>
      <div className={cn("flex flex-col h-[45svh] p-2 gap-2 group hover:shadow-[#A8ACB030] hover:shadow-md cursor-pointer")} data-testid={`product-${name.toLowerCase().replaceAll(" ", "-")}`}>
        <div className="relative basis-3/4 h-3/4 object-cover">
          <div className={cn(`absolute hidden bg-gray-400/55  items-center justify-center top-0 right-0 bottom-0 left-0`, { "flex": !inStock })}>OUT OF STOCK</div>
          <img src={img} className="h-full w-full object-cover object-top" />
          <button
            className={cn(`absolute rounded-full bg-primary bottom-0 translate-y-1/2 right-4 p-4 hidden group-hover:block stroke-white fill-white hover:bg-primary/75 z-50`, { "hidden group-hover:hidden": !inStock })}
            disabled={!inStock}
            data-testid="add-to-cart"
            onClick={(e) => {
              e.preventDefault();
              addItem({ id, price });
              setIsCartOpen(true);
            }}>
            <Cart />
          </button>
        </div>
        <span className="font-thin">{name}</span>
        <span className="font-semibold">{price}{currency}</span>
      </div>
    </Link >
  )
}
