import express from "express"
import cors from "cors"
import { connetDB } from "./config/db.js"
import FoodRouters from "./routes/FoodRoutes.js"
import userRouter from './routes/userRouter.js';
import "dotenv/config.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRoutes.js";

// App config
let app = express();
let port =4000;

// Middleware 
app.use(express.json());
app.use(cors());
// DB connection
connetDB();

// API endpoints
app.use("/api/food", FoodRouters);
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
