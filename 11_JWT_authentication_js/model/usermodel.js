
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
      validate: {
        validator(value) {
          return !value.toLowerCase().includes("password");
        },
        message: "Password cannot contain the word password.",
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.statics.findByCredential = async function (email, password) {
  const user = await this.findOne({
    email: email.toLowerCase().trim(),
  }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    throw new Error("Invalid email or password");
  }

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in .env");
  }

  const token = jwt.sign(
    { _id: this._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "9d" }
  );

  this.tokens.push({ token });
  await this.save();

  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
