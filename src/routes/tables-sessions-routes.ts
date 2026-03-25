import { TableSessionsController } from "@/controllers/tables-sessions-controller";
import { Router } from "express";


export const tablesSessionsRoutes = Router()
const tableSessionsController = new TableSessionsController

tablesSessionsRoutes.post("/", tableSessionsController.create)