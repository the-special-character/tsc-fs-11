import { connect } from 'react-redux';
import Login from './Login';

const mapStateToProps = store => ({});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch({ type: 'ADD_USER_SUCCESS', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
