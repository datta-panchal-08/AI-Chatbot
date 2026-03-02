import express from 'express';
import 'dotenv/config';
import { connectDB } from './db/connectDB.js';
import userRoutes from './routes/user.routes.js';
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/v1/user",userRoutes);


app.listen(PORT,()=>{
    console.log("Server is running on PORT: ",PORT);
});

connectDB();




