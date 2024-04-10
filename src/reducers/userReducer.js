const initialState = {};

export default (state = initialState, { type, payload }) => {
  console.log('type', type);
  console.log('payload', payload);
  switch (type) {
    case 'LOAD_USER_SUCCESS':
      return { ...state, ...payload };

    case 'ADD_USER_SUCCESS':
      return { ...state, ...payload };

    default:
      return state;
  }
};
