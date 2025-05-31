import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@description    Login user/set token
//route           POST: /api/users/auth
//access          Public
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

//@description    Register a new user
//route           POST: /api/users
//access          Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
};

//@description    Logout a user
//route           POST: /api/users
//access          Public
const logoutUser = async (req, res, next) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User Logged Out" });
  } catch (error) {
    next(error);
  }
};

//@description    Get user profile
//route           GET: /api/users/profile
//access          Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//@description    Update user profile
//route           PUT: /api/users/profile
//access          Private
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      //if name or email is provided, update it else keep the old one
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      //if password is provided, update it
      if (req.body.password) {
        user.password = req.body.password;
      }

      //save the updated user
      const updatedUser = await user.save();

      //send a response with the updated user details
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
