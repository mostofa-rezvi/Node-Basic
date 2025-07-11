// Error handling middleware
const errorMiddleware = (err, req, res, next) => {
  console.log("Error Middleware:", err);

  const defaultErrors = {
    statusCode: 500,
    message: err.message || "Internal Server Error",
  };

  if (err.name === "ValidationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (err.code && err.code === 11000) {
    defaultErrors.statusCode = 400;
    defaultErrors.message = `${Object.keys(
      err.keyValue
    )} field must be unique.`;
  }

  res.status(defaultErrors.statusCode).json({ message: defaultErrors.message });
};

export default errorMiddleware;
