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
import {
  ADD_CART_ITEM,
  CREATE_CART,
  FAIL,
  LOAD_CART,
  REQUEST,
  SUCCESS,
} from '../constants/actions';
import { useAuth } from './authContext';

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
  const {
    user: { user },
  } = useAuth();

  const loadCart = useCallback(async () => {
    const type = LOAD_CART;
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

  const createCart = useCallback(async () => {
    // const type = CREATE_CART;
    try {
      let cartId = localStorage.getItem('card_id');
      let cart = null;

      if (cartId) {
        cart = await ai.get(`660/cart/${cartId}`);
      } else {
        cart = await ai.post(`660/cart`, {
          id: new Date().valueOf(),
          userId: user.id,
          date: new Date().toUTCString(),
          products: [],
        });

        cartId = cart.id;
        localStorage.setItem('card_id', cartId);
      }

      if (!cart) throw new Error('Something went wrong...');
    } catch (error) {
      // dispatch({ type: `${type}_${FAIL}`, payload: { errorPayload: error } });
    }
  }, []);

  const addToCart = useCallback(async data => {
    const type = ADD_CART_ITEM;
    try {
      dispatch({ type: `${type}_${REQUEST}`, payload: {} });
      const res = await ai.post('660/cart', data);
      dispatch({
        type: `${type}_${SUCCESS}`,
        payload: { cartPayload: res },
      });
    } catch (error) {
      dispatch({ type: `${type}_${FAIL}`, payload: { errorPayload: error } });
    }
  }, []);

  useEffect(() => {
    createCart();
  }, [createCart]);

  const value = useMemo(
    () => ({
      cartState,
      loadCart,
      addToCart,
    }),
    [cartState, loadCart, addToCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
