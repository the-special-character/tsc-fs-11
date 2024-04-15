const logMidleware = store => next => action => {
  //   console.log(action.type);
  //   make server call to send error info

  next(action);
};

export default logMidleware;
