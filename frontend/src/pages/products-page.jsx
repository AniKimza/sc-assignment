import { useEffect } from "react";
import { ProductCard } from "../components/products-page/product-card"
import { useQuery, gql } from '@apollo/client';

export const ProductsPage = ({ category }) => {
  const { loading, error, data } = useQuery(gql`
query {
  products ${category ? `(category:"${category}")` : ""}{
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
`);
  return (
    <div className="flex flex-col gap-12">
      <h1 className="font-semibold text-4xl capitalize">{category}</h1>
      {loading ? <div className="mx-auto my-auto text-xl">Loading...</div> : <div className="grid h-full grid-cols-3 gap-x-8 gap-y-12">
        {data.products.map(p => <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} img={p.gallery[0].link} currency={p.currency} inStock={p.inStock} />)}
      </div>}
    </div>
  )
}
