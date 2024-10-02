import React from 'react';
import { ReactComponent as Logo } from "../../logo.svg";
import { ReactComponent as Cart } from "../../cart.svg";
import { CartOverLayContext } from "../../state/CartOverlay";

export class Nav extends React.Component {

  render() {
    const { children } = this.props;

    return (
      <CartOverLayContext.Consumer>{({ toggleCartPopupOpen }) =>
        <nav className="flex justify-between pt-4 px-[8vw]">
          <ul className="flex gap-4">
            {children}
          </ul>
          <Logo />
          <button onClick={toggleCartPopupOpen} className="relative" data-testid="cart-btn">
            <Cart />
          </button>
        </nav>
      }
      </CartOverLayContext.Consumer>
    );
  }
}
