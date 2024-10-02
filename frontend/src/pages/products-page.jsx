import React from 'react';
import { ProductCard } from "../components/products-page/product-card";
import { Query } from '@apollo/client/react/components';
import { gql } from '@apollo/client';

const GET_PRODUCTS = category => gql`
  query {
    products ${category ? `(category:"${category}")` : ""} {
      id
      name
      price
      currency
      inStock
      gallery {
        link
      }
    }
  }
`;

export class ProductsPage extends React.Component {
  componentDidMount() {
    console.log("Props", this.props)
  }
  render() {
    const { category } = this.props;

    return (
      <div className="flex flex-col gap-12">
        <h1 className="font-semibold text-4xl capitalize">{category}</h1>
        <Query query={GET_PRODUCTS(category)}>
          {({ loading, data }) => {
            if (loading) return <div className="mx-auto my-auto text-xl">Loading...</div>;

            return (
              <div className="grid h-full grid-cols-3 gap-x-8 gap-y-12">
                {data.products.map(p => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    price={p.price}
                    img={p.gallery[0].link}
                    currency={p.currency}
                    inStock={p.inStock}
                  />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
