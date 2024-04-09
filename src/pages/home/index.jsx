import { connect } from 'react-redux';
import Home from './Home';

const mapStateToProps = ({ theme, locale }) => ({
  theme,
  locale,
});

const mapDispatchStateToProps = () => {};

export default connect(mapStateToProps, mapDispatchStateToProps)(Home);
