import React from 'react';
import PropTypes from 'prop-types';

function Home({ theme, locale }) {
  return (
    <div>
      <h1>{`Current Theme: ${theme}`}</h1>
      <h1>{`Current Locale: ${locale}`}</h1>
    </div>
  );
}

Home.propTypes = {
  theme: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Home;
