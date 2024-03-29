import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import ai from '../utils';
import crudReducer from '../reducers/crudReducer';
import loadingReducer from '../reducers/loadingReducer';
import errorReducer from '../reducers/errorReducer';
import { FAIL, LOAD_PRODUCTS, REQUEST, SUCCESS } from '../constants/actions';

export const CartContext = createContext();

const cartInitialState = {
  cart: [],
  loading: [],
  error: [],
};

const cartReducer = (
  state,
  { type, payload: { cartPayload, loadingPayload, errorPayload } },
) => ({
  cart: crudReducer(state.cart, { type, payload: cartPayload }),
  loading: loadingReducer(state.loading, { type, payload: loadingPayload }),
  error: errorReducer(state.error, { type, payload: errorPayload }),
});

export function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, cartInitialState);

  const loadCart = useCallback(async () => {
    const type = LOAD_PRODUCTS;
    try {
      dispatch({ type: `${type}_${REQUEST}`, payload: {} });
      const res = await ai.get('660/cart');
      dispatch({
        type: `${type}_${SUCCESS}`,
        payload: { cartPayload: res },
      });
    } catch (error) {
      dispatch({ type: `${type}_${FAIL}`, payload: { errorPayload: error } });
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const value = useMemo(
    () => ({
      cartState,
      loadCart,
    }),
    [cartState, loadCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
