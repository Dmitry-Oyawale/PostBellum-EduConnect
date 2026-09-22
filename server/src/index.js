import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js"
import dashRoutes from "./routes/dashRoutes.js"
import interactionRoutes from "./routes/interactionRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import programRoutes from "./routes/programRoutes.js"
import schoolRoutes from "./routes/schoolRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import teacherRoutes from "./routes/teacherRoutes.js"

dotenv.config()

const app = Express();

app.use(cors())

app.use(express.json())

app.get("/", (req, res) => {

    res.json({
        message: "PostBellum-EduConnect API is running",
    });

});

app.use("/api/auth", authRoutes);

app.use("/api/dashboard", dashRoutes);

app.use("/api/interaction", interactionRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/program", programRoutes);

app.use("/api/school", schoolRoutes);

app.use("/api/task", taskRoutes);

app.use("/api/teacher", teacherRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
});