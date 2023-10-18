const jwt = require("jsonwebtoken");

function isAdmin(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.isAdmin = decoded.isAdmin;
    // console.log(decoded.isAdmin)

    if (!decoded.isAdmin) {
      return res.status(401).json("Unauthorized");
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
 


function authorize(req, res, next) {
  // Get the token from the request headers or query parameters
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, 'your-secret-key');

    // console.log(decoded.exp) 
    // Check if the token has expired
    if (decoded.exp <= Date.now() / 1000) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    // Token is valid, proceed to the next middleware
    next();
  } catch (error) {
    // Token verification failed
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function verifyCertainToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.userId = decoded.userId;
    // console.log(decoded.userId)
    if (decoded.userId !== req.params.userId) {
      return res.status(401).json("unauthorize");
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

function verifyPostCertainToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.userId = decoded.userId;
    if (decoded.userId !== req.body.userId) {
      return res.status(401).json("unauthorize");
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  isAdmin,
  authorize,
  verifyCertainToken,
  verifyPostCertainToken,
};
