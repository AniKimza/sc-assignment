import React from "react";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { CartOverLayContext } from "../state/CartOverlay";
import { cn } from "../utils/cn";
import { withRouter } from "../utils/withRouter";
import { withCart } from "../utils/withCart";

const htmlFrom = (htmlString) => {
  const cleanHtmlString = DOMPurify.sanitize(htmlString,
    { USE_PROFILES: { html: true } });
  const html = parse(cleanHtmlString);
  return html;
}

const GET_PRODUCT = (id) => gql`
  {
    product(id: "${id}") {
      id
      name
      price
      currency
      description
      inStock
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

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: 0,
      selectedSize: undefined,
      selectedColor: undefined,
      selectedCapacity: undefined,
      usb3: undefined,
      touchID: undefined
    };

    // const { addItem } = useCart();
    // const { setIsCartOpen } = useCartOverLayContext();
    // this.addItem = addItem;
    // this.setIsCartOpen = setIsCartOpen;
  }

  handleAddToCart = (id, price) => {
    const { selectedCapacity, selectedColor, selectedSize, usb3, touchID } = this.state;
    const { cart } = this.props;

    cart.addItem({
      id,
      price,
      capacity: selectedCapacity,
      color: selectedColor,
      size: selectedSize,
      usb3,
      touchID
    });
  }

  renderAttributeButtons = (items, type, selectedValue, onChange) => {
    if (!items || items.length === 0) return null;

    const isColor = type === 'color';
    const label = {
      size: 'Size:',
      capacity: 'Capacity:',
      color: 'Color:',
      usb3: 'With USB 3 Ports:',
      touchID: 'Touch ID in Keyboard:'
    }[type];

    return (
      <div className="mt-4">
        <span className="font-semibold">{label}</span>
        <div className="flex space-x-2 mt-2" data-testid={`product-attribute-${type}`}>
          {items.map((item) => (
            <button
              key={item.id}
              data-testid={`product-attribute-${type}-${item.id}`}
              className={isColor
                ? cn(`w-10 h-10`, { "ring-2 ring-primary": selectedValue === item.id })
                : cn(`border rounded-md py-2 px-4 transition`, { "bg-black text-white": selectedValue === item.id })}
              style={isColor ? { backgroundColor: item.value } : undefined}
              onClick={() => onChange(item.id)}
            >
              {!isColor && item.displayValue}
            </button>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { id } = this.props.params;
    const { cart } = this.props.cart;
    const { selectedImage, selectedSize, selectedColor, selectedCapacity, usb3, touchID } = this.state;

    return (
      <CartOverLayContext.Consumer>
        {(cartOverLay) =>
          <Query query={GET_PRODUCT(id)}>
            {({ loading, error, data }) => {
              if (loading) return <div className="h-svh w-full flex justify-center items-center text-xl">Loading...</div>;

              const product = data.product;

              return (
                <div className="container mx-auto px-4 py-8">
                  <div className="flex">
                    <div className="flex basis-1/2">
                      <div className="flex flex-col p-2 space-y-2 mr-2" data-testid="product-gallery">
                        {product.gallery.map((p, i) => (
                          <button key={p.link} onClick={() => this.setState({ selectedImage: i })}>
                            <img
                              src={p.link}
                              alt="Thumbnail"
                              className="w-16 h-16 rounded-lg cursor-pointer"
                            />
                          </button>
                        ))}
                      </div>
                      <div className="flex-1">
                        <img
                          src={product.gallery[selectedImage].link}
                          alt="Product"
                          className="flex-1 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="basis-1/2 pl-8">
                      <h1 className="text-3xl font-semibold">{product.name}</h1>

                      {this.renderAttributeButtons(product.sizes, 'size', selectedSize,
                        (id) => this.setState({ selectedSize: id }))}
                      {this.renderAttributeButtons(product.capacities, 'capacity', selectedCapacity,
                        (id) => this.setState({ selectedCapacity: id }))}
                      {this.renderAttributeButtons(product.usb3, 'usb3', usb3,
                        (id) => this.setState({ usb3: id }))}
                      {this.renderAttributeButtons(product.touchID, 'touchID', touchID,
                        (id) => this.setState({ touchID: id }))}
                      {this.renderAttributeButtons(product.colors, 'color', selectedColor,
                        (id) => this.setState({ selectedColor: id }))}

                      <div className="mt-4">
                        <span className="text-xl font-semibold">{product.price}{product.currency}</span>
                        <button
                          className={cn(`bg-primary hover:bg-primary/75 transition text-white rounded-lg py-2 px-6 ml-4 uppercase`, {
                            "bg-gray-400 hover:bg-gray-400": !product.inStock ||
                              (product.colors.length > 0 && !selectedColor) ||
                              (product.sizes.length > 0 && !selectedSize) ||
                              (product.capacities.length > 0 && !selectedCapacity)
                          })}
                          data-testid="add-to-cart"
                          disabled={!product.inStock ||
                            (product.colors.length > 0 && !selectedColor) ||
                            (product.sizes.length > 0 && !selectedSize) ||
                            (product.capacities.length > 0 && !selectedCapacity)}
                          onClick={() => { cartOverLay.toggleCartPopupOpen(); this.handleAddToCart(id, product.price) }}
                        >
                          Add to Cart
                        </button>
                      </div>

                      <div className="mt-4 text-gray-600" data-testid="product-description">
                        {htmlFrom(product.description)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </Query>
        }
      </CartOverLayContext.Consumer>
    );
  }
}

export default withRouter(withCart(ProductPage));
