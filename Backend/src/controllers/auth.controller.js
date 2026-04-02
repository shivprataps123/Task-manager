import { loginUser, signupUser, getCurrentUser, updateUserProfile } from "../services/auth.service.js";

export const signup = async (req, res, next) => {
    try {
        const user = await signupUser(req.body);

        res.status(201).json({
            success: true,
            message: "User created",
            data: user
        });

    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const data = await loginUser(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data
        });

    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await getCurrentUser(req.userId);

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const profilePhoto = req.file ? `/uploads/${req.file.filename}` : undefined;

        const user = await updateUserProfile(req.userId, { name, email, profilePhoto });

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });

    } catch (error) {
        next(error);
    }
};