// middleware.js
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

const withAuth = function(req, res, next) {

  const token = req.cookies.token;

  if (!token) {

    res.send('Unauthorized: No token provided');

  } else {

    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.send('Unauthorized: Invalid token');
      } else {
        req.user = decoded.user;
        next();
      }
    });

  }
}

module.exports = withAuth;