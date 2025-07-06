import JWT from "jsonwebtoken";

// Middleware to check authentication
const userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next("Authentication failed. No token provided.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    next("Authentication failed. Invalid token.");
  }
};

export default userAuth;
