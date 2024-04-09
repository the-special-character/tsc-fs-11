const initialState = 'dark';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOGGLE_THEME':
      return payload;

    default:
      return state;
  }
};
