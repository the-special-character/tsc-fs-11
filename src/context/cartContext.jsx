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
  DELETE_CART_ITEM,
  FAIL,
  LOAD_CART,
  REQUEST,
  SUCCESS,
  UPDATE_CART_ITEM,
} from '../constants/actions';
import { useAuth } from './authContext';

export const CartContext = createContext();

const cartInitialState = {
  cart: {},
  loading: [],
  error: [],
};

const objCrudReducer = (state, { type, payload }) => {
  switch (type) {
    case `${CREATE_CART}_${SUCCESS}`:
    case `${ADD_CART_ITEM}_${SUCCESS}`:
    case `${UPDATE_CART_ITEM}_${SUCCESS}`:
    case `${DELETE_CART_ITEM}_${SUCCESS}`:
      return payload;

    default:
      return state;
  }
};

const cartReducer = (
  state,
  { type, payload: { cartPayload, loadingPayload, errorPayload } },
) => ({
  cart: objCrudReducer(state.cart, { type, payload: cartPayload }),
  loading: loadingReducer(state.loading, { type, payload: loadingPayload }),
  error: errorReducer(state.error, { type, payload: errorPayload }),
});

export function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, cartInitialState);
  const {
    user: { user },
  } = useAuth();

  const createCart = useCallback(async () => {
    if (user?.id) {
      const type = CREATE_CART;
      console.log('create cart');
      try {
        dispatch({
          type: `${type}_${REQUEST}`,
          payload: { loadingPayload: {} },
        });
        let cartId = localStorage.getItem('card_id');
        let cart = null;

        if (!cartId) {
          cart = await ai.post(`660/cart`, {
            id: new Date().valueOf(),
            userId: user.id,
            date: new Date().toUTCString(),
            products: [],
          });
          cartId = cart.id;
          localStorage.setItem('card_id', cartId);
        } else {
          cart = await ai.get(`660/cart/${cartId}`);
        }

        if (!cart) {
          throw new Error('Cart not created');
        }

        dispatch({
          type: `${type}_${SUCCESS}`,
          payload: { cartPayload: cart },
        });
      } catch (error) {
        dispatch({ type: `${type}_${FAIL}`, payload: { errorPayload: error } });
      }
    }
  }, [user.id]);

  const addCartItem = useCallback(
    async data => {
      const type = ADD_CART_ITEM;
      try {
        dispatch({
          type: `${type}_${REQUEST}`,
          payload: {
            loadingPayload: {
              id: data.productId,
            },
          },
        });
        const { cart } = cartState;
        const res = await ai.put(`660/cart/${cart.id}`, {
          ...cart,
          products: [...cart.products, data],
        });
        dispatch({
          type: `${type}_${SUCCESS}`,
          payload: { cartPayload: res },
        });
      } catch (error) {
        dispatch({ type: `${type}_${FAIL}`, payload: { errorPayload: error } });
      }
    },
    [cartState.cart],
  );

  const updateCartItem = useCallback(
    async data => {
      const type = UPDATE_CART_ITEM;
      try {
        dispatch({
          type: `${type}_${REQUEST}`,
          payload: {
            loadingPayload: {
              id: data.productId,
            },
          },
        });
        const { cart } = cartState;
        const index = cart.products.findIndex(
          x => x.productId === data.productId,
        );
        const res = await ai.put(`660/cart/${cart.id}`, {
          ...cart,
          products: [
            ...cart.products.slice(0, index),
            data,
            ...cart.products.slice(index + 1),
          ],
        });
        dispatch({
          type: `${type}_${SUCCESS}`,
          payload: { cartPayload: res },
        });
      } catch (error) {
        dispatch({ type: `${type}_${FAIL}`, payload: { errorPayload: error } });
      }
    },
    [cartState.cart],
  );

  const deleteCartItem = useCallback(
    async data => {
      const type = DELETE_CART_ITEM;
      try {
        dispatch({
          type: `${type}_${REQUEST}`,
          payload: {
            loadingPayload: {
              id: data.productId,
            },
          },
        });
        const { cart } = cartState;
        const index = cart.products.findIndex(
          x => x.productId === data.productId,
        );
        const res = await ai.put(`660/cart/${cart.id}`, {
          ...cart,
          products: [
            ...cart.products.slice(0, index),
            ...cart.products.slice(index + 1),
          ],
        });
        dispatch({
          type: `${type}_${SUCCESS}`,
          payload: { cartPayload: res },
        });
      } catch (error) {
        dispatch({ type: `${type}_${FAIL}`, payload: { errorPayload: error } });
      }
    },
    [cartState.cart],
  );

  useEffect(() => {
    createCart();
  }, [createCart]);

  const value = useMemo(
    () => ({
      cartState,
      addCartItem,
      updateCartItem,
      deleteCartItem,
    }),
    [cartState, addCartItem, updateCartItem, deleteCartItem],
  );

  console.log(cartState);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
