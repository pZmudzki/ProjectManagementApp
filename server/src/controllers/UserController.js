const User = require("../models/userSchema");

// @desc    Register a new user
// @route   POST /register
// @access  Public

const createUser = async (req, res) => {
  // console.log(req.body);
  const { username, password, email, role } = req.body;
  // console.log(username, password, email, role);
  try {
    const userExists = await User.findOne({ email });
    // console.log(userExists);
    if (userExists) {
      res.status(400).send("User already exists");
    } else {
      const user = await User.create({
        username,
        password,
        email,
        role,
      });
      if (user) {
        res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        });
      } else {
        res.status(400).send("Invalid user data");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = createUser;
