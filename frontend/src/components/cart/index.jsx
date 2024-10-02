import React from "react";
import { cn } from "../../utils/cn";
import CartItem from "./cart-item";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { withCart } from "../../utils/withCart";
import { CartOverLayContext } from "../../state/CartOverlay";

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($items: [OrderItemInput!]!) {
    createOrder(items: $items) {
      id
      items {
        id
        quantity
      }
    }
  }
`;

class CartPopup extends React.Component {
  handlePlaceOrder = (addOrder) => {
    const { cart } = this.props;
    const orderItems = cart.items.map(i => ({
      product: i.id,
      quantity: i.quantity,
      color: i.color,
      capacity: i.capacity,
      size: i.size,
      usb3: i.usb3,
      touchID: i.touchID
    }));

    addOrder({
      variables: { items: orderItems }
    }).then(() => {
      cart.emptyCart();
    });
  }

  render() {
    const { cart } = this.props;
    const { totalItems, items, cartTotal } = cart;

    return (
      <CartOverLayContext.Consumer>{({ isCartOpen: isOpen }) =>
        <div
          className={cn(
            "absolute top-0 right-[8vw] z-50 min-w-80 h-fit max-h-[50svh] bg-white shadow-lg transform transition scroll-auto overflow-auto w-fit",
            { "scale-100": isOpen, "scale-0": !isOpen }
          )}
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold">
              My Bag, {totalItems} {totalItems > 1 ? "items" : "item"}
            </h2>
            <div className="mt-4 space-y-6">
              {items.map((i) => (
                <CartItem key={i.id} id={i.id} quantity={i.quantity} />
              ))}
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span data-testid='cart-total'>{cartTotal}$</span>
              </div>
              <Mutation mutation={CREATE_ORDER_MUTATION}>
                {(addOrder, { loading, error }) => (
                  <button
                    className="mt-4 w-full bg-green-500 text-white rounded-lg py-2"
                    onClick={() => this.handlePlaceOrder(addOrder)}
                    disabled={loading || totalItems === 0}
                  >
                    {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
                  </button>
                )}
              </Mutation>
            </div>
          </div>
        </div>
      }</CartOverLayContext.Consumer>
    );
  }
}

export default withCart(CartPopup);
