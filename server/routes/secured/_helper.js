const jwt    = require('jsonwebtoken');

exports.isSecured = function(req, res, token) {
    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, secretIdToken, function(err, decoded) {
        if (err) {
          return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          res.header("Access-Control-Allow-Origin", "*");
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });
    }
  }
