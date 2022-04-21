// path /api/signup
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "60d",
      });
      const { name, role, email } = user;
      res.status(201).json({ token, user: { name, role, email } });
    } else {
      return res
        .status(401)
        .json({ message: "Email & Password combination is not correct" });
    }
  } catch (error) {
    console.log(error);
  }
};
