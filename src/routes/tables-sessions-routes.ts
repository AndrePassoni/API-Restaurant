import { TableSessionsController } from "@/controllers/tables-sessions-controller";
import { Router } from "express";


export const tablesSessionsRoutes = Router()
const tableSessionsController = new TableSessionsController

tablesSessionsRoutes.get("/", tableSessionsController.index)
tablesSessionsRoutes.post("/", tableSessionsController.create)
tablesSessionsRoutes.patch("/:id", tableSessionsController.update)