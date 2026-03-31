import { OrdersController } from "@/controllers/orders-controller";
import { Router } from "express";

export const ordersRoutes = Router()
const ordersController = new OrdersController

ordersRoutes.post("/", ordersController.create)