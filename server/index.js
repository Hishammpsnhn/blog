import express from "express";
import dbConfig from "./config/db.js";
import dotenv from "dotenv";
import authRoute from './routes/authRoutes.js'
import postRoute from './routes/postRoutes.js'
import cors from 'cors'
import morgan from 'morgan'

dotenv.config();

const app = express();
const allowedOrigins = [
  process.env.CLIENT_URL, 
  "http://localhost:5173",
  "https://shiny-speculoos-15727b.netlify.app/" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));
app.use(express.json())
app.use(morgan())

dbConfig();

app.use('/api/auth',authRoute)
app.use('/api/post',postRoute)


const port = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`server listening on port ${port}`);
});
