import jwt from "jsonwebtoken";

// Middleware function to authenticate the JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  // If no token is found, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }

  // Verify the token using the secret key from environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    req.user = user;
    // Proceed to the next middleware function or route handler
    next();
  });
};

// Export the middleware function for use in other modules
export default authenticateToken;
