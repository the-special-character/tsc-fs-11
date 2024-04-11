import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

function MainLayout({ user }) {
  if (!user?.accessToken) {
    return <Navigate to="/auth" />;
  }
  return <Outlet />;
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(MainLayout);
