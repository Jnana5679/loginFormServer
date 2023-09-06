const jwtToken = require("jsonwebtoken");

const validateJsonToken = async (req, res, next) => {
  try {
    const jsonToken = req.headers.authorization;
    if (jsonToken) {
      const isValidToken = jwtToken.verify(
        jsonToken,
        process.env.JWT_SECRET_KEY
      );
      if (isValidToken) {
        return next();
      }
      return res.status(401).send({ message: "Acceess Forbidden" });
    }
    return res.status(401).json({ message: "Access Forbidden" });
  } catch (error) {
    return res.status(500).json({ message: "Invalid Token" });
  }
};

module.exports = validateJsonToken;
