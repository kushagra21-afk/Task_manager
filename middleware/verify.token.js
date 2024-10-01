const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token1 = req.body.jwt;
    console.log('token: ' + token1);
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

  try {
    console.log(token)
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token',err});
    console.log(token)
  }
};

module.exports = verifyToken;
