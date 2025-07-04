// error middleware || NEXT Function
const errorMiddleware = (err, req, res, next) => {
  console.log("Error Middleware:", err);
  res.status(500).send({
    success: false,
    message: err.message || "Something went wrong.",
    error: err,
  });
};

export default errorMiddleware;
