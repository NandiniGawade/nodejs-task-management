import asyncHandler from "express-async-handler";
import User from "../models/authModel.js";
import generateToken from "../generateToken.js";


// @desc    register a new User
// @route   POST /api/user/register
const register = asyncHandler(async (req, res) => {
    const {username, password, email } = req.body;
    console.log(req.body)

    const userExists = await User.findOne({ username });

    if (userExists) {
        res.status(404);
        res.json({
          message: "Username already registered, please change the username"
        })
        throw new Error("Username already registered, please change the username");
    }
    const user = await User.create({
        username,
        email,
        password
    });

    if (user) {
        const token = generateToken(user._id);

        res.status(201).json({
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          token: token,
        });
    } else {
        res.status(400);
        res.json({
            message: "Not able to register the User at the Moment, please try later"
        })
        throw new Error("Not able to register the User at the Moment, please try later");
    }
});

// @desc    login a user
// @route   POST /api/user/login

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      res.json({
          message: "Invalid Username or Password, please re-enter"
      })
      throw new Error("Invalid Username or Password, please re-enter");
    }
});

export { register, loginUser };