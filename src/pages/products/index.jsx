import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/productsContext';

function Products() {
  const {
    productsState: { products, loading, error },
  } = useProducts();

  return (
    <div>
      {products?.map(x => (
        <Link key={x.id} to={`${x.id}`}>
          <img src={x.image} alt={x.title} />
          <h1>{x.title}</h1>
        </Link>
      ))}
    </div>
  );
}

export default Products;
