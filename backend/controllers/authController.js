import User from "../models/user.js";
import {OAuth2Client} from 'google-auth-library'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID, 
);
const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "Thiếu idToken từ Google" });
    }

    // Xác thực token với Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // Tìm kiếm user theo email
    let user = await User.findOne({ email });

    if (user) {
      // Nếu user đã tồn tại, cập nhật thêm googleId nếu chưa có
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = "google";
        if (!user.profileImage && picture) {
          user.profileImage = picture;
        }
        await user.save();
      }
    } else {
      // Nếu chưa có, tạo user mới
      user = await User.create({
        name,
        email,
        profileImage: picture,
        googleId,
        authProvider: "google",
      });
    }

    // Trả về dữ liệu kèm JWT token của hệ thống
    res.status(200).json({
      success: true,
      message: "Đăng nhập Google thành công",
      data: {
        id: user._id,
        avatar: user.profileImage,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error("Lỗi Google Login:", error);
    res.status(400).json({ message: "Xác thực tài khoản Google thất bại", error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //Return user data with JWT
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check for user email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.json({
        success: true,
        message: "Login successful",
        data: {
          id: user._id,
          avatar: user.avatar,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export { registerUser, loginUser, getUserProfile, googleLogin };
