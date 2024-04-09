import React from 'react';
import PropTypes from 'prop-types';

function About({ theme, locale, changeTheme, user }) {
  console.log('user', user);

  return (
    <div>
      <h1>{`Current Theme: ${theme}`}</h1>
      <h1>{`Current Locale: ${locale}`}</h1>

      <button
        type="button"
        onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Change Theme
      </button>
    </div>
  );
}

About.propTypes = {
  theme: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  changeTheme: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default About;
