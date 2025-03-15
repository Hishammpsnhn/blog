import express from "express";
import dbConfig from "./config/db.js";
import dotenv from "dotenv";
import authRoute from './routes/authRoutes.js'
import postRoute from './routes/postRoutes.js'
import cors from 'cors'
import morgan from 'morgan'

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json())
app.use(morgan())

dbConfig();

app.use('/api/auth',authRoute)
app.use('/api/post',postRoute)


const port = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`server listening on port ${port}`);
});
