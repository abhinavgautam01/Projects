import { Request, Response, Router } from "express";
import { taskController } from "./tasks.controller";
import { createValidator } from "./tasks.validator";
import { validationResult } from "express-validator";


export const tasksRouter: Router = Router()
tasksRouter.get('/tasks', (req: Request, res: Response) => {
    taskController.getAll(req, res);
});
//@ts-ignore
tasksRouter.post('/tasks', createValidator, async(req: Request, res: Response)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
})