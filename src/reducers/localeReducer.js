const initialState = 'en';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOGGLE_LOCALE':
      return payload;

    default:
      return state;
  }
};
