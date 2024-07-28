const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "adrija$$project"; // JSON Web Token secret

//*Route 1
//Create a user using: POST "/api/auth/createUser" | No login required
router.post(
  "/createUser",
  [
    // Validation using express-validator
    body("name", "Name is required").notEmpty(),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be at least 8 characters long").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already exists" }] });
      }

      // Ensure password is a string
      const password = req.body.password;
      if (typeof password !== "string") {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid password format" }] });
      }

      // Hash password with a salt factor of 10
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      // Save user to the database
      await user.save();

      // Create JWT payload
      const data = {
        user: {
          id: user.id,
        },
      };

      // Generate JWT token
      const authtoken = jwt.sign(data, JWT_SECRET);

      // Send response
      res.status(201).json({
        message: "User created successfully",
        authtoken,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Server error");
    }
  }
);

//*Route 2
// Authenticate a user using: POST "api/auth/login" | No login required
router.post(
  "/login",
  [
    // Validate the user
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be NULL").exists(),
  ],
  async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "Invalid email" });
      }

      // Check the password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ msg: "Invalid password" });
      }

      // Create JWT payload
      const data = {
        user: {
          id: user.id,
        },
      };

      // Generate JWT token
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).send("Server error");
    }
  }
);

//*Route 3
// Get login user information using : POST "/api/auth/getuser" | Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const UserId = req.user.id;
    const user = await User.findById(UserId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
