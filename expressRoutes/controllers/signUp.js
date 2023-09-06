const UserDetailsSchema = require("../../mongoSchema/userDetailsSchema");
const bcrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await UserDetailsSchema.create({
      email: email,
      username: username,
      password: hashedPassword,
    });

    const token = jwtToken.sign(
      { email: createUser.email, id: createUser._id },
      process.env.JWT_SECRET_KEY
    );

    res
      .status(201)
      .json({ message: "user created successfully", jsonToken: token });
  } catch (error) {
    return res.status(500).json("Something wwent Wrong");
  }
};

module.exports = signup;
