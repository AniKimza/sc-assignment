import React from "react";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { withCart } from "../../utils/withCart";

const GET_PRODUCT = (id) => gql`
  {
    product(id: "${id}") {
      id
      name
      price
      currency
      description
      gallery {
        link
      }
      colors {
        id
        value
        displayValue
      }
      capacities {
        id
        value
        displayValue
      }
      sizes {
        id
        value
        displayValue
      }
      usb3 {
        id
        value
        displayValue
      }
      touchID {
        id
        value
        displayValue
      }
    }
  }
`;

class CartItem extends React.Component {
  renderAttributeButtons(items, type, currentItemId) {
    if (!items || items.length === 0) return null;

    const { cart } = this.props;
    const { id } = this.props;
    const currentItem = cart.getItem(id);
    const isColor = type === 'color';

    const labels = {
      size: 'Size:',
      capacity: 'Capacity:',
      color: 'Color:',
      usb3: 'With USB 3 Ports:',
      touchID: 'Touch ID in Keyboard:'
    };

    return (
      <div className="mt-4">
        <span className="font-semibold">{labels[type]}</span>
        <div className="flex space-x-2 mt-2" data-testid={`product-attribute-${type}`}>
          {items.map((item) => (
            <button
              key={item.id}
              data-testid={`product-attribute-${type}-${item.id.toLowerCase().replaceAll(" ", "-")}${currentItem[type] === item.id ? "-selected" : ""}`}
              className={isColor
                ? `w-10 h-10 ${currentItem[type] === item.id ? "ring-2 ring-primary" : ""}`
                : `border rounded-md py-2 px-4 transition ${currentItem[type] === item.id ? "bg-black text-white" : ""}`}
              style={isColor ? { backgroundColor: item.value } : undefined}
              onClick={() => this.handleUpdateAttribute(type, item.id)}
            >
              {!isColor && item.displayValue}
            </button>
          ))}
        </div>
      </div>
    );
  }

  handleUpdateAttribute = (type, value) => {
    const { cart, id } = this.props;
    const currentItem = cart.getItem(id);
    cart.updateItem(id, { ...currentItem, [type]: value });
  }

  handleQuantityChange = (increment) => {
    const { cart, id } = this.props;
    const currentItem = cart.getItem(id);
    const newQuantity = increment
      ? currentItem.quantity + 1
      : (currentItem.quantity > 0 ? currentItem.quantity - 1 : 0);

    cart.updateItem(id, { ...currentItem, quantity: newQuantity });
  }

  render() {
    const { id, quantity } = this.props;

    return (
      <Query query={GET_PRODUCT(id)}>
        {({ loading, data }) => {
          if (loading) return <div>Loading</div>;

          const product = data.product;

          return (
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex">
                <img
                  src={product.gallery[0].link}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg mr-4"
                />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p>{product.price}{product.currency}</p>

                  {this.renderAttributeButtons(product.sizes, 'size')}
                  {this.renderAttributeButtons(product.capacities, 'capacity')}
                  {this.renderAttributeButtons(product.usb3, 'usb3')}
                  {this.renderAttributeButtons(product.touchID, 'touchID')}
                  {this.renderAttributeButtons(product.colors, 'color')}
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="border rounded-md p-1"
                  onClick={() => this.handleQuantityChange(false)}
                >
                  -
                </button>
                <span className="mx-2" data-testid='cart-item-amount'>{quantity}</span>
                <button
                  className="border rounded-md p-1"
                  onClick={() => this.handleQuantityChange(true)}
                >
                  +
                </button>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withCart(CartItem);
