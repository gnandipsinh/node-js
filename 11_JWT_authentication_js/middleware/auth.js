
import jwt from "jsonwebtoken";
import User from "../model/usermodel.js";
import HttpError from "../middleware/httpError.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new HttpError("Authorization token is required", 401)
      );
    }

    if (!process.env.JWT_SECRET) {
      return next(new HttpError("JWT_SECRET is not configured", 500));
    }

    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      return next(new HttpError("Unauthorized access", 401));
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    return next(new HttpError("Invalid or expired token", 401));
  }
};

export default auth;
