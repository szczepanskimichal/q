import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

export default async function handle(req, res) {
  if (req.method === "POST") {
    await mongooseConnect();

    const { email, password } = req.body;

    if (!password || password.length < 8) {
      res
        .status(405)
        .json({ error: "Password must have at least 8 characters." });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
      const user = await User.create({
        email,
        password: hashedPassword,
      });
      return res.json(user);
    } catch (error) {
      if (error.code === 11000 && error.keyValue.email) {
        res.status(409).json({ error: "Email address already exists" });
      } else {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Unexpected error occured" });
      }
    }
    res.json(true);
  }
}
