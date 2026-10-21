
import User from "../model/usermodel.js";
import HttpError from "../middleware/httpError.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new HttpError("Name, email and password are required", 400));
    }

    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new HttpError("Email already exists", 409));
    }
    return next(new HttpError(error.message, 400));
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new HttpError("Email and password are required", 400));
    }

    const user = await User.findByCredential(email, password);
    const token = await user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return next(new HttpError(error.message, 401));
  }
};

const authLogin = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated user",
    user: req.user,
  });
};

const deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.user._id });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { add, getAll, login, authLogin, deleteUser };
