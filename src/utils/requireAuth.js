const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // Get the token from the request headers or query parameters
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, "your_secret_key");

    // Check if the token has expired
    if (decoded.exp <= Date.now() / 1000) {
      return res.status(401).json({ message: "Token has expired" });
    }

    // Token is valid, proceed to the next middleware
    next();
  } catch (error) {
    // Token verification failed
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { verifyToken };
