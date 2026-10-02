const jwt = require("jsonwebtoken");

const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith("Bearer ")
    ) {
      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = decoded;
    }
  } catch (error) {
    req.user = null;
  }

  next();
};

module.exports = optionalAuth;