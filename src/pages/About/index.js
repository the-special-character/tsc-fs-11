import { connect } from 'react-redux';
import About from './About';

const mapStateToProps = store => ({
  theme: store.theme,
  locale: store.locale,
  user: store.user,
});

const mapDispatchToProps = dispatch => ({
  changeTheme: payload => dispatch({ type: 'TOGGLE_THEME', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
