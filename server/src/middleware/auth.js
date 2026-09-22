import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
    const header = req.headers.authorization

    if (!header) {
        return res.status(401).json({
            message: "Authorization token required",
        });
    }

    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({
            message: "Invalid authorization format",
        });
    }
    
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        
        req.user = decoded;

        next();
    } catch {
        return res.status(401)({
            message: "Invalid or expired token",
        });
    }

}