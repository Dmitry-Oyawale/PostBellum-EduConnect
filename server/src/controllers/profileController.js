import pool from "../db.js";
// getMyProfile	
// updateMyProfile	
// changePassword

export async function getMyProfile(req, res) {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            `
            SELECT u.name, u.email, u.role, u.region, u.created_at, i.subject, i.interaction_type, i.interaction_date, t.title, t.due_date, t.status
            JOIN interactions i ON i.user_id = u.id
            JOIN tasks t ON t.assigned_to = u.id
            FROM users u
            WHERE u.id = $1
            `, 
            [userId]
        );

        res.json(result.rows[0]);
    } catch(error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}