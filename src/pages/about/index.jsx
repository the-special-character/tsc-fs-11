import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  return (
    <div>
      <p>About</p>
      <Link to="/login">GO to login</Link>
      <button
        type="button"
        onClick={() => {
          navigate('/register');
        }}
      >
        Go to register
      </button>
    </div>
  );
}

export default About;
