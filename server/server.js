import express from "express";
import connectDB from "./config/db.js";
import { config } from 'dotenv';
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import { notFound } from "./middleware/errorMiddleware.js";


const app = express();

app.use(express.json());


config();
connectDB();


const PORT = process.env.PORT || 4000;


//add routes for Authentication and for Task CRUD operations
app.use('/api/user', authRoutes);
app.use('/api/task', taskRoutes);

app.use(notFound);

app.listen(PORT, console.log(`server started on port ${PORT}`));