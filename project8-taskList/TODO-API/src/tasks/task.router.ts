import { Request, Response, Router } from "express";
import { taskController } from "./tasks.controller";
import { createValidator, updateValidator } from "./tasks.validator";
// import { validationResult } from "express-validator";


export const tasksRouter: Router = Router()
tasksRouter.get('/tasks', (req: Request, res: Response) => {
    taskController.getAll(req, res);
});
//@ts-ignore
tasksRouter.post('/tasks', createValidator, taskController.create)
//@ts-ignore
tasksRouter.put('/tasks', updateValidator, taskController.update)