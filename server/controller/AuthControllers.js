import { Prisma, PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";


const generatePassword = async (password) => {
    const salt = await genSalt();
    return await hash(password, salt);
};

const maxTime = 3 * 24 * 60 * 60;
const createToken = (username, email, userId) => {

    return jwt.sign({ username, email, userId }, process.env.JWT_KEY, {
        expiresIn: maxTime,
    });
};

export const signup = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();
        const { username, email, password } = req.body;
        if (username && email && password) {
            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: await generatePassword(password),
                },
            });
            return res
                .status(201).json({
                    user: { id: user?.id, username: user?.username, email: user?.email },
                    jwt: createToken(username, email, user.id),
                });
        } else {
            return res.status(400).send("Username, Email, and Password Required");
        }
    } catch (err) {
        console.log(err);
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return res.status(400).send("Email Already Registered");
            }
        } else {
            return res.status(500).send("Internal Server Error");
        }
        throw err;
    }
};

export const login = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();
        const { email, password } = req.body;
        if (email && password) {
            const user = await prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                return res.status(400).send("User not found");
            }
            const auth = await compare(password, user.password)

            if (!auth) {
                return res.status(400).send("Invalid password");
            }

            return res
                .status(200)
                .json({
                    user: { id: user?.id, email: user?.email },
                    jwt: createToken(email, user.id),
                });
        } else {
            return res.status(400).send("Email and Password Required");
        }
    } catch (err) {
        console.log(err);
    }
};