import express from "express";

import { placeOrder, allOrders, userOrders, updateStatus }  
import adminAuth from '../middleware/adminAuth.js'




orderRouter.post('/place',placeOrder)
