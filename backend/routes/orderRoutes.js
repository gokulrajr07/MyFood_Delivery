import express from 'express';
import { placeOrder } from '../controllers/orderControllers.js';
import authMiddleware from '../middleware/auth.js'; 
let orderRouter = express.Router();

// Place order endpoint
orderRouter.post("/place", authMiddleware, placeOrder);

export default orderRouter;
