const UserDetailsSchema = require("../../mongoSchema/userDetailsSchema");

const doesUserExitInDataBase = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const getUserDetails = await UserDetailsSchema.findOne({ email: email });
    if (getUserDetails) {
      return res.status(400).json({ message: "User Already Existed" });
    }
    next();
  } catch (error) {
    res.status(500).json("Something Went Wrong");
  }
};

module.exports = doesUserExitInDataBase;
