import React from 'react';
import { useCart } from 'react-use-cart';

export function withCart(WrappedComponent) {
  return function WithCartComponent(props) {
    const cartProps = useCart();
    console.log(props)

    return <WrappedComponent {...props} cart={cartProps} />;
  };
}
