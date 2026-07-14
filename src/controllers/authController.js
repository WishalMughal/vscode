import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const normalizeEmail = (value) =>
  String(value || "").trim().toLowerCase();

const normalizeRole = (value) => {
  const role = String(value || "")
    .trim()
    .toLowerCase();

  return role === "student"
    ? "student"
    : "user";
};

export const register = async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");
    const requestedRole = String(
      req.body.role || "user"
    )
      .trim()
      .toLowerCase();

    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "Name, email and password are required",
      });
    }

    if (requestedRole === "admin") {
      return res.status(403).json({
        msg: "Admin registration is not allowed",
      });
    }

    const exists = await User.findOne({
      where: { email },
    });

    if (exists) {
      return res.status(400).json({
        msg: "Email already in use",
      });
    }

    const passwordHash = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: passwordHash,
      role: normalizeRole(requestedRole),
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: String(user.role)
        .trim()
        .toLowerCase(),
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      msg:
        error?.parent?.sqlMessage ||
        "Registration failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(
      req.body.password || ""
    );

    if (!email || !password) {
      return res.status(400).json({
        msg: "Email and password are required",
      });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatches) {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    }

    const role = String(user.role || "")
      .trim()
      .toLowerCase();

    const token = jwt.sign(
      {
        id: user.id,
        userId: user.id,
        email: user.email,
        role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      msg:
        error?.parent?.sqlMessage ||
        "Login failed",
    });
  }
};