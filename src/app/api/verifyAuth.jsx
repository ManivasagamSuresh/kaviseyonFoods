
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; // Ensure the correct casing and name for the environment variable

const verifyAuth = (req, res, next) => {
  // Check if authorization header is present
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = req.headers.authorization.split(' ')[1]; // Assuming the format "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
  }

  try {
    // Verify the token using the secret
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Token verification failed' });
      }
      req.user = user; // Attach the user information to the request object
      next(); // Call the next middleware or route handler
    });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: An error occurred' });
  }
};

export default verifyAuth;
