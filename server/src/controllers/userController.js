const User = require("../models/userSchema");
const Notification = require("../models/notificationSchema");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const { handleUpload } = require("../helpers/cloudinaryUpload");

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Register API Endpoint
const registerUser = async (req, res) => {
  try {
    var cldRes = undefined;
    if (req.file !== undefined) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const { secure_url } = await handleUpload(dataURI);
      cldRes = secure_url;
    } else {
      cldRes =
        "https://res.cloudinary.com/dxsyxo3em/image/upload/v1702754500/jlo7ofvr5ew9vfctd0ki.jpg";
    }

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
      profilePicture: cldRes,
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
        {
          _id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
            })
            .json({ user: user, isAuthenticated: true });
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

// Update Profile API Endpoint
const updateUser = async (req, res) => {
  try {
    const { username, email, password, id } = req.body;
    const currentUserData = await User.findById(id);

    let updateFields = {
      username: username,
      email: email,
    };

    if (req.file !== undefined) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const { secure_url } = await handleUpload(dataURI);
      cldRes = secure_url;
      updateFields.profilePicture = cldRes;
    }

    if (!username) {
      return res.json({ error: "Username has not been entered." });
    }

    if (email !== currentUserData.email) {
      const userExists = await User.findOne({ email: email });
      if (userExists) {
        return res.json({
          error: "An account with this email already exists.",
        });
      }
    }

    if (password !== "") {
      if (await comparePassword(password, currentUserData.password)) {
        return res.json({
          error: "Previous password has been entered.",
        });
      }
      updateFields.password = await hashPassword(password);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
      omitUndefined: true,
    });

    const notification = await Notification.create({
      notificationType: "User",
      sender: id,
      receivers: [id],
      message: "Your account has been updated succesfully.",
    });

    return res.json({
      message: "Account updated!",
      updatedUser: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

// Logout API Endpoint
const logoutUser = (req, res) => {
  try {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .json({ user: null, isAuthenticated: false });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

// Forgot Password API Endpoint (get token and send email)
const getResetToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ error: "No account with this email exists." });
    }
    const token = user._id;

    // update user's resetPasswordToken field
    await User.findByIdAndUpdate(user._id, {
      resetPasswordToken: token,
    });

    // send email
    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "ProjectFlow Password Reset",
      html: `<h2>Please click on the link below to reset your password.</h2><a href="https://projectflow.onrender.com/reset-password/${token}">Reset Password -></a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(400).json({ error: "Error sending an email." });
      } else {
        return res
          .status(200)
          .json({ message: `Email with password reset link sent!` });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Reset Password API Endpoint (validate token and change password)
const changePassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    console.log(password, token);

    if (!token) return res.json({ error: "No token provided." });

    //check token validity
    const tokenExists = await User.findById(token);
    if (!tokenExists) {
      return res.json({
        error: "Invalid token.",
      });
    }
    if (password.length < 6) {
      return res.json({
        error: "The password needs to be at least 6 characters long.",
      });
    }

    // update user's password
    const updatedUser = await User.findOneAndUpdate(
      {
        resetPasswordToken: token,
      },
      {
        password: await hashPassword(password),
        resetPasswordToken: "",
      }
    );

    res.json({ message: "Password updated!" });
  } catch (error) {
    console.log(error.message);
  }
};

// check if user is logged in API Endpoint
const isLoggedIn = (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.json({ user: null, isAuthenticated: false });

    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json({ user: user, isAuthenticated: true });
    });
  } catch (error) {
    res.json({ user: null, isAuthenticated: false });
    console.log(error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  isLoggedIn,
  getResetToken,
  changePassword,
};
