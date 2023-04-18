const jwt = require("jsonwebtoken");
const config = require("../user/config/config_service");

const isAuth = (req, res, next) => {
   try {
     const authHeader = req.get("Authorization");
     if (!authHeader) {
       const error = new Error("Not authenticated.");
       error.statusCode = 401;
       throw error;
     }
     const token = authHeader.split(" ")[1];
     let decoded;
     try {
       decoded = jwt.verify(token, config.jwt.secret);
     } catch (err) {
       err.statusCode = 500;
       throw err;
     }
     if (!decoded) {
       const error = new Error("Not authenticated.");
       error.statusCode = 401;
       throw error;
     }
     req.user = decoded;
     next();
   } catch (error) {
        return res.status(401).json({ message: "Not authenticated." });
   }
};
    

module.exports = isAuth;