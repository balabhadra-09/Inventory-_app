
const jwt = require("jsonwebtoken");
 


// const verifyToken = async (req, res, next) => {
//     try {
//         const token = req.headers["authorization"];

//         if (!token) {
//             return res.status(401).send({ message: "Token is required" });
//         }

//         if (!token.startsWith("Bearer ")) {
//             return res.status(401).send({ message: "Invalid token format" });
//         }
        
//         const tokenValue = token.substring(7);

//         const data = await jwt.verify(tokenValue, process.env.SECRETE_KEY);

//         req.User = data;

//         return next();
//     } catch (error) {
//         if (error.name === 'TokenExpiredError') {
//             return res.status(401).send({ message: 'Token has expired' });
//         } else if (error.name === 'JsonWebTokenError') {
//             return res.status(401).send({ message: 'Invalid token' });
//         } else {
//             return res.status(500).send({ message: 'Internal Server Error' });
//         }
//     }
// };

// module.exports = verifyToken;

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');
  
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
  
    try {
      console.log('Token received:', token);
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (error) {
              if (error.name === 'TokenExpiredError') {
                  return res.status(401).send({ message: 'Token has expired' });
              } else if (error.name === 'JsonWebTokenError') {
                  return res.status(401).send({ message: 'Invalid token' });
              } else {
                  return res.status(500).send({ message: 'Internal Server Error' });
              }
          }
  };