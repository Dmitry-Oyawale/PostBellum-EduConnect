import pool from "../db.js"

export async function getMyTasks(req, res) {

    try {
        const userId = req.user.id;

        const result = await pool.query(
            `
            SELECT t.title, t.description, s.name, teacher.name, t.due_date, t.status, t.created_at
            FROM tasks t
            JOIN schools s ON s.id = t.school_id
            JOIN teachers ON teacher.id = t.teacher_id
            WHERE t.assigned_to = $1
            ORDER BY t.created_at DESC
            `,
            [userId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
        });
    }
}

export async function getMyPrograms(req, res) {
    try {
        
        const userId = req.user.id;

        const result = await pool.query(
            `
            SELECT DISTINCT p.name, p.description, p.start_date, p.end_date, p.created_at, i.school_id
            FROM programs p
            JOIN interactions i ON i.program_id = p.id 
            WHERE i.user_id = $1
            `,
            [userId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
        })
    }
}

export async function getMySchools(req, res) {
    try {
        const userId = req.user.id; 

        const result = await pool.query ( 
            `
            SELECT DISTINCT s.name, s.city, s.region, s.address, s.email, s.phone, s.relationship_status, u.name
            FROM schools s
            JOIN interactions i ON i.school_id = s.id
            JOIN users u ON s.owner_id = u.name
            WHERE i.user_id = $1
            `,
            [userId]
        );

        res.json(result.rows)

    } catch(error) {
        console.error(error)
        res.status(500).json({
            message: "Server error",
        });
    }
}

export async function getPopularPrograms(req, res) {
    try {
        const userid = req.user.id;
        
        const result = await pool.query(
            `
            SELECT p.id, p.name, p.description, p.start_date, p.end_date, p.created_at, COUNT(i.id) AS participation_count
            FROM programs p 
            -- use number of teacher participations as indicator of program popularity
            LEFT JOIN participations par ON p.id = par.program_id
            GROUP BY p.id
            ORDER BY participation_count DESC
            LIMIT 10 
            `
        );

        res.json(result.rows);

    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
        });
    }
}

export async function getRecentInteractions(req, res) {
    try {
        const userId = req.user.id;
        
        const result = await pool.query(
            `
            SELECT i.interaction_type, i.subject, i.notes, i.interaction_date, i.created_at, s.name, t.name, u.name, p.name
            FROM interactions i
            JOIN schools s ON i.school_id = s.id
            JOIN teachers t ON i.teacher_id = t.id
            JOIN users u ON i.user_id = u.id
            JOIN programs p ON i.program_id = p.id
            WHERE u.id = $1
            ORDER BY created_at DESC
            LIMIT 10 
            `,
            [userId]
        );

        res.json(result.rows);

    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
        });
    }
}

// query my tasks, my programs and schools, popular programs, and recent interactions
export async function getFeed(req, res) {
    try {
    const userId = req.user.id; // Match your auth middleware.

    const [tasks, programs, schools, popularPrograms, recentInteractions] =
      await Promise.all([
        getMyTasks(userId),
        getMyPrograms(userId),
        getMySchools(userId),
        getPopularPrograms(),
        getRecentInteractions(userId),
      ]);

    res.json({
      tasks,
      programs,
      schools,
      popularPrograms,
      recentInteractions,
    });
  } catch (error) {
    next(error);
  }
}