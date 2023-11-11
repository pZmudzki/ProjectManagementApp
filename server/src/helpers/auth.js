const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const authenticate = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  authenticate,
};
