import { User } from '../models/user.model.js';
import cloudinary from '../utils/cloudinary.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                message: "All fields required.",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists.",
                success: false
            });
        }

        let profilePicUrl = "";
        let profilePicPublicId = "";

        if (req.file) {
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "GenAiProfile" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });

            profilePicUrl = uploadResult.secure_url;
            profilePicPublicId = uploadResult.public_id;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            profilepic: profilePicUrl,
            profilePublicId: profilePicPublicId
        });

        const userResponse = newUser.toObject();
        delete userResponse.password;

        return res.status(201).json({
            message: "Signup Successful!",
            success: true,
            user: userResponse
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Required Email & Password",
                success: false
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const passMatch = await bcrypt.compare(password, user.password);

        if (!passMatch) {
            return res.status(400).json({
                message: "Invalid Email Or Password",
                success: false
            });
        }

        const payload = {
            id: user._id,
            email: user.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2d"
        });

     
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 2 * 24 * 60 * 60 * 1000
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            message: "Login Successful",
            success: true,
            user: userResponse
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return res.status(200).json({
            message: "Logout Successful",
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};