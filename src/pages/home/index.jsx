import { connect } from 'react-redux';
import Home from './Home';

const mapStateToProps = ({ products }) => ({
  products,
});

const mapDispatchStateToProps = dispatch => ({
  loadProducts: payload => dispatch({ type: 'LOAD_PRODUCTS_SUCCESS', payload }),
});

export default connect(mapStateToProps, mapDispatchStateToProps)(Home);
