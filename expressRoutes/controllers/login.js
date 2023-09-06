const UserDetailsSchema = require("../../mongoSchema/userDetailsSchema");
const bcrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const getUserDetails = await UserDetailsSchema.findOne({ email: email });
    if (getUserDetails) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        getUserDetails.password
      );

      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      const token = jwtToken.sign(
        { email: email, id: getUserDetails._id },
        process.env.JWT_SECRET_KEY
      );

      return res.status(200).json({ token: token });
    }
    res.status(401).json({ message: "User doesnot exist" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something Went Wrong");
  }
};

module.exports = login;
