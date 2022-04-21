// path /api/signup
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import bcrypt from "bcryptjs";

dbConnect();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(422).json({ error: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ error: "User already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    console.log(newUser);
    res.status(201).json({ message: "New account created successfully!" });
  } catch (error) {
    console.log(error);
  }
};
