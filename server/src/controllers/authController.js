const User = require("../models/userSchema");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

// const test = (req, res) => {
//   res.json("test is working");
// };

// Register API Endpoint
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username) {
      return res.json({ error: "Username has not been entered" });
    }
    if (!password) {
      return res.json({ error: "Password has not been entered" });
    }
    if (password.length < 6) {
      return res.json({
        error: "The password needs to be at least 6 characters long.",
      });
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.json({
        error: "An account with this email already exists.",
      });
    }

    const newUser = await User.create({
      username,
      email,
      password: await hashPassword(password),
    });
    return res.json(newUser);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

// Login API Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({ error: "Email has not been entered" });
    }
    if (!password) {
      return res.json({ error: "Password has not been entered" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ error: "No account with this email exists." });
    }

    const isMatch = await comparePassword(password, user.password);
    if (isMatch) {
      jwt.sign(
        { _id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
            })
            .json(user);
        }
      );
    } else {
      return res.json({ error: "Invalid credentials." });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

// Get Profile API Endpoint (for protected routes)
// const getProfile = (req, res) => {
//   const { token } = req.cookies;
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
//       if (err) throw err;
//       res.json(user);
//     });
//   } else {
//     res.json(null);
//   }
// };

// c
const isLoggedIn = (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res, json(null);

    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } catch (error) {
    res.json(null);
    console.log(error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  // getProfile,
  isLoggedIn,
};
