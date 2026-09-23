import pool from "../db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

function createToken(user) {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "7d",
        }
    );
}

export async function register(req, res) {
    try {
        const {
            username, 
            email,
            password,
        } = req.body;
    

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email, amd "
            });
        }

        const existing = await pool.query(
            `
            SELECT id
            FROM users
            WHERE username = $1
            OR email = $2
            `,
            [username, email]
        );

        if (existing.rows.length > 0) {
            return res.status(409).json({
                message: "Username or email already exists",
            });
        }

        const passwordHash = await bcrypt.hash(
            password, 
            12
        );

        const result = await pool.query(
            `
            INSERT INTO users
            (
                username,
                email,
                password_hash
            )
            
            VALUES ($1, $2, $3)

            RETURNING 
                id, 
                username,
                email,
                role,
                region,
                created_at
            `,

            [
                username,
                email,
                passwordHash, 
            ]

        );

        const user = result.rows[0]

        const token = createToken(user)

        delete user.password_hash;

        res.json({
            token,
            user,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error", 
        });
    }
}