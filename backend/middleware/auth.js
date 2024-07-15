const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Check for token in Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token found, return 401 Unauthorized
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied." });

  try {
    // Verify token using JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user information to the request object
    req.user = decoded;

    // Call next middleware function
    next();
  } catch (err) {
    // If token is invalid, return 401 Unauthorized
    res.status(401).json({ message: "Token is not valid." });
  }
};


const adminAuth = (req, res, next) => {
    // Use the auth middleware to verify the token first
    auth(req, res, () => {
        // Check if the decoded user has an 'admin' role
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }
        // If admin, call the next middleware function
        next();
    });
};

module.exports = { auth, adminAuth };
