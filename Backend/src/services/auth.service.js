import prisma from "../prisma/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import AppError from "../utils/AppError.js";

export const signupUser = async ({ email, password }) => {
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new AppError("User already exists", 409)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    })
    return user
}

export const loginUser = async ({ email, password }) => {
    const user = await prisma.user.findUnique({
        where: { email }

    })

    if (!user) {
        throw new AppError("Invalid credentials", 401)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new AppError("Invalid credentials", 401)
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )

    return { user, token }
}

export const getCurrentUser = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true
        }
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
}