const UserDetailsSchema = require("../../mongoSchema/userDetailsSchema");
const bcrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");

const UpdateUserPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const userDetails = jwtToken.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );

    const getUserDetailsFromDB = await UserDetailsSchema.findOne({
      _id: userDetails.id,
    });

    const isCurrentPasswordMatch = await bcrypt.compare(
      currentPassword,
      getUserDetailsFromDB.password
    );

    if (isCurrentPasswordMatch) {
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      const updatePassword = await UserDetailsSchema.updateOne(
        { email: getUserDetailsFromDB.email },
        { $set: { password: newHashedPassword } }
      );
      return res.status(200).json({ message: "Password updated successfully" });
    }
    return res.status(400).json({ message: "Invalid Credentials" });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = UpdateUserPassword;
