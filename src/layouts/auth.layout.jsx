import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

function AuthLayout({ user }) {
  if (user?.accessToken) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(AuthLayout);
