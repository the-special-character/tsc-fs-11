import { connect } from 'react-redux';
import Register from './Register';

const mapStateToProps = store => ({});

const mapDispatchToProps = dispatch => ({
  register: payload => dispatch({ type: 'ADD_USER_SUCCESS', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
