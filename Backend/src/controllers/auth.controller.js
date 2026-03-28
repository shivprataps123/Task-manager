import { loginUser, signupUser } from "../services/auth.service.js";

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