import { Request, Response } from "express";
import User from "../models/users";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token";
import cloudinary from "../utils/cloudinary";
import { AuthenticatedRequest } from "../models/interfaces";

export const register = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password } = req.body;

  try {
    if (!email || !firstName || !lastName || !password) {
      res.status(400).json({ message: "Please fill in all fields" });
    }

    if (!email.includes("@") || !email.includes(".")) {
      res.status(400).json({ message: "Please enter a valid email address" });
    }

    if (password.length < 6) {
      res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id.toString(), res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      });
    }
  } catch (error: any) {
    console.log("Error in register controller: " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(400).json({ message: "User not found" });
    } else {
      const correctPassword = await bcrypt.compare(
        password,
        existingUser.password as string
      );

      if (!correctPassword) {
        res.status(400).json({ message: "Invalid credentials" });
      } else {
        generateToken(existingUser._id.toString(), res);
        res.status(201).json({
          _id: existingUser._id,
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
        });
      }
    }
  } catch (error: any) {
    console.log("Error in register controller: " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (_req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
  } catch (error: any) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  try {
    const { profilePic } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const id = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
