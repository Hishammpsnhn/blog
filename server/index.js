import express from "express";
import dbConfig from "./config/db.js";
import dotenv from "dotenv";
import authRoute from './routes/authRoutes.js'
import postRoute from './routes/postRoutes.js'

dotenv.config();

const app = express();
app.use(express.json())

dbConfig();

app.use('/api/auth',authRoute)
app.use('/api/post',postRoute)


const port = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`server listening on port ${port}`);
});
