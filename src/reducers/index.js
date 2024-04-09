import { combineReducers } from 'redux';
import localeReducer from './localeReducer';
import themeReducer from './themeReducer';
import productsReducer from './productsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  locale: localeReducer,
  theme: themeReducer,
  products: productsReducer,
  user: userReducer,
});

export default rootReducer;
