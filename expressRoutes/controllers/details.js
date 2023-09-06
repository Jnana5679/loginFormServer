const jwtToken = require("jsonwebtoken");
const UserDetailsSchema = require("../../mongoSchema/userDetailsSchema");

const getDetails = async (req, res) => {
  const token = req.headers.authorization;

  const tokenDetails = jwtToken.verify(token, process.env.JWT_SECRET_KEY);

  try {
    const getUserDetails = await UserDetailsSchema.findOne({
      email: tokenDetails.email,
    });
    if (getUserDetails) {
      return res.status(200).json({ message: getUserDetails.username });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = getDetails;
