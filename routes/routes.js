const express = require("express");
const User = require("../models/User");
const router = express.Router();

// User register
router.post("/users/token/:token", async (req, res, next) => {
  try {
    if (req.params.token === "1234") {
      await res.status(200).json({ success: true });
    } else {
      await res.status(400).json({ success: false });
    }
  } catch (error) {
    await res.status(400).json({ success: false, msg: error.message });
  }
});

// User create
router.post("/users", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const userSave = await user.save();
    res.status(201).json({ _id: userSave._id });
  } catch (error) {
    res.status(400).json({ message: error.errors });
    console.log(error);
  }
});

//Get all Users
router.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Token megszerzése a modeltől, süti létrehozása és válasz küldése
const sendTokenResponse = (user, statusCode, res) => {
    // Token létrehozása
    const token = user.getSignedJwtToken()
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: false,
    }
  
    res.status(statusCode).cookie('token', token, options).json({
      success: true,
      token,
    })
  }

module.exports = router;
