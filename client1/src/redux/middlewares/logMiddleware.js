const logMiddleware = () => (next) => (action) => {
  console.log("In log middleware");
  console.time(action.type);
  next(action);
  console.timeEnd(action.type);
};

export default logMiddleware;
