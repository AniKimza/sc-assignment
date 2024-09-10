import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router";
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { useCart } from "react-use-cart";
import { useCartOverLayContext } from "../state/CartOverlay";
import { cn } from "../utils/cn";

const htmlFrom = (htmlString) => {
  const cleanHtmlString = DOMPurify.sanitize(htmlString,
    { USE_PROFILES: { html: true } });
  const html = parse(cleanHtmlString);
  return html;
}

const ProductPage = () => {
  let { id } = useParams()
  const { addItem } = useCart();
  const { setIsCartOpen } = useCartOverLayContext();
  const { loading, error, data } = useQuery(gql`
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
  }
}
`);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedCapacity, setSelectedCapacity] = useState();

  return (loading ? <div className="h-svh w-full flex justify-center items-center text-xl">Loading...</div> :
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        <div className="flex basis-1/2">
          <div className="flex flex-col p-2 space-y-2 mr-2" data-testid="product-gallery">
            {data.product.gallery.map((p, i) => <button key={p.link} onClick={() => setSelectedImage(i)}><img
              src={p.link}
              alt="Thumbnail"
              className="w-16 h-16 rounded-lg cursor-pointer"
            /> </button>)}

          </div>
          <div className="flex-1">
            <img
              src={data.product.gallery[selectedImage].link}
              alt="Product"
              className="flex-1 rounded-lg"
            />
          </div>
        </div>

        <div className="basis-1/2 pl-8">
          <h1 className="text-3xl font-semibold">{data.product.name}</h1>

          {data.product.sizes.length > 0 ? <div className="mt-4">
            <span className="font-semibold">Size:</span>
            <div className="flex space-x-2 mt-2" data-testid="product-attribute-size">
              {data.product.sizes.map((size) => <button data-testid={`product-attribute-size-${size.id}`}
                key={size.id}
                className={`border rounded-md py-2 px-4 transition  ${selectedSize === size.id ? "bg-black text-white" : ""}`}
                onClick={() => setSelectedSize(size.id)}
              >
                {size.displayValue}
              </button>
              )}
            </div>
          </div> : <></>}


          {data.product.capacities.length > 0 ? <div className="mt-4">
            <span className="font-semibold">Capacity:</span>
            <div className="flex space-x-2 mt-2" data-testid="product-attribute-capacity">
              {data.product.capacities.map((capacity) => <button data-testid={`product-attribute-capacity-${capacity.id}`}
                key={capacity.id}
                className={`border rounded-md py-2 px-4 transition ${selectedCapacity === capacity.id ? "bg-black text-white" : ""}`}
                onClick={() => setSelectedCapacity(capacity.id)}
              >
                {capacity.displayValue}
              </button>
              )}
            </div>
          </div> : <></>}

          {data.product.colors.length > 0 ? <div className="mt-4">
            <span className="font-semibold">Color:</span>
            <div className="flex space-x-2 mt-2" data-testid="product-attribute-color">
              {data.product.colors.map((color) => <button data-testid={`product-attribute-color-${color.id}`}
                key={color}
                className={`w-10 h-10  ${selectedColor === color.id ? "ring-2 ring-primary" : ""}`}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color.id)}
              ></button>
              )}
            </div>
          </div> : <></>}


          <div className="mt-4">
            <span className="text-xl font-semibold">{data.product.price}{data.product.currency}</span>
            <button
              className={cn(`bg-primary hover:bg-primary/75 transition text-white rounded-lg py-2 px-6 ml-4 uppercase`, { "bg-gray-400 hover:bg-gray-400": !data.product.inStock || (data.product.colors.length > 0 && !selectedColor) || (data.product.sizes.length > 0 && !selectedSize) || (data.product.capacities.length > 0 && !selectedCapacity) })}
              data-testid="add-to-cart"
              disabled={!data.product.inStock || (data.product.colors.length > 0 && !selectedColor) || (data.product.sizes.length > 0 && !selectedSize) || (data.product.capacities.length > 0 && !selectedCapacity)}
              onClick={() => { addItem({ id, price: data.product.price, capacity: selectedCapacity, color: selectedColor, size: selectedSize }); setIsCartOpen(true) }}
            >
              Add to Cart
            </button>
          </div>

          {/* Product Description */}
          <div className="mt-4 text-gray-600" data-testid="product-description">
            {htmlFrom(data.product.description)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
