import { combineReducers } from 'redux';
import localeReducer from './localeReducer';
import themeReducer from './themeReducer';
import productsReducer from './productsReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  locale: localeReducer,
  theme: themeReducer,
  products: productsReducer,
  user: userReducer,
  cart: cartReducer,
});

export default rootReducer;
