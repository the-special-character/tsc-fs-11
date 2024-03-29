import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import ai from '../utils';
import crudReducer from '../reducers/crudReducer';
import loadingReducer from '../reducers/loadingReducer';
import errorReducer from '../reducers/errorReducer';
import { FAIL, LOAD_PRODUCTS, REQUEST, SUCCESS } from '../constants/actions';

export const ProductsContext = createContext();

const productsInitialState = {
  products: [],
  loading: [],
  error: [],
};

const productsReducer = (
  state,
  { type, payload: { productsPayload, loadingPayload, errorPayload } },
) => ({
  products: crudReducer(state.products, { type, payload: productsPayload }),
  loading: loadingReducer(state.loading, { type, payload: loadingPayload }),
  error: errorReducer(state.error, { type, payload: errorPayload }),
});

export function ProductsProvider({ children }) {
  const [productsState, dispatch] = useReducer(
    productsReducer,
    productsInitialState,
  );

  const loadProducts = useCallback(async () => {
    const type = LOAD_PRODUCTS;
    try {
      dispatch({ type: `${type}_${REQUEST}`, payload: {} });
      const res = await ai.get('660/products');
      dispatch({
        type: `${type}_${SUCCESS}`,
        payload: { productsPayload: res },
      });
    } catch (error) {
      dispatch({ type: `${type}_${FAIL}`, payload: { errorPayload: error } });
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const value = useMemo(
    () => ({
      productsState,
      loadProducts,
    }),
    [productsState, loadProducts],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
