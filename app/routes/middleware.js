// middleware.js
require('dotenv').config({ encoding: 'latin1' });
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;

const withAuth = function(req, res, next) {

  const token = req.cookies.token;

  if (!token) {

    res.send('0');

  } else {

    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.send('0');
      } else {
        req.user = decoded.idUser;
        req.rol = decoded.idRol;
        next();
      }
    });

  }
}

module.exports = withAuth;