import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../../utils';

function Home({ products, loadProducts }) {
  return (
    <div>
      {products.map(x => (
        <div key={x.id}>
          <h2>{x.title}</h2>
        </div>
      ))}
    </div>
  );
}

Home.propTypes = {
  theme: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Home;
