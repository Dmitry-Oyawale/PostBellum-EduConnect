import pool from "../db.js"

export async function getInteractions(req, res) {
    try {
        const result = await pool.query(
            `
            SELECT i.interaction_type, i.notes, i.interaction_date, i.created_at, s.name, t.name, u.name, p.name
            FROM interactions i 
            JOIN schools s ON s.id = i.school_id
            JOIN teachers t ON t.id = i.teacher_id
            JOIN users u ON u.id = i.user_id
            JOIN programs p ON p.id = i.program_id
            `,
            [id_]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Interaction not found",
            });
        };

        res.json(result.rows);

    } catch(error) {
        console.error(error); 
        
        res.status(500).json({
            message: "server error",
        });
    }
}

export async function getInteractionById(req, res) {
    try {
        const id_ = Number(req.params.id);

        const result = await pool.query(
            `
            SELECT i.interaction_type, i.notes, i.interaction_date, i.created_at, s.name, t.name, u.name, p.name
            FROM interactions i 
            JOIN schools s ON s.id = i.school_id
            JOIN teachers t ON t.id = i.teacher_id
            JOIN users u ON u.id = i.user_id
            JOIN programs p ON p.id = i.program_id
            WHERE i.id = $1
            `,
            [id_]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Interaction not found",
            });
        };

        res.json(result.rows[0]);

    } catch(error) {
        console.error(error); 
        
        res.status(500).json({
            message: "server error",
        });
    }
}

export async function createInteraction(req, res) {
    try {
        const {
            id, 
            school_id,
            teacher_id,
            user_id,
            program_id,
            interaction_type,
            subject,
            notes,
            interaction_date,
            created_at
        } = req.body;

        const result = await pool.query(
            `
            INSERT INTO interactions 
            (
            id, 
            school_id,
            teacher_id,
            user_id,
            program_id,
            interaction_type,
            subject,
            notes,
            interaction_date,
            created_at
            )

            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)

            RETURNING * 
            `,
            [
                id, 
                school_id,
                teacher_id,
                user_id,
                program_id,
                interaction_type,
                subject,
                notes,
                interaction_date,
                created_at
            ]
            
        );

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error",
        });
    }
}

export async function deleteInteraction(req, res) {
    try {
        const id_ = req.params.id

        const result = await pool.query(
            `
            DELETE FROM interactions
            WHERE id = $1

            RETURNING id
            `,  
            [id_]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "Interaction not found",
            })
        };

        res.json({ 
            message: "Interaction deleted",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message:"Server error",
        })
    }
}