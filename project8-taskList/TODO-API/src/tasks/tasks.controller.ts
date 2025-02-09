import { AppDataSource } from "../../index";
import { Task } from "./tasks.entity";
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

class TaskController {
    public async getAll(req: Request, res: Response): Promise<Response>{
        let allTasks: Task[]
        try {
            allTasks = await AppDataSource.getRepository(Task).find({
                order: {
                    date: 'ASC'
                }
            })
            allTasks = instanceToPlain(allTasks) as Task[]
            return res.json(allTasks).status(200)
        } catch (_errors) {
            return res.json({error: 'Internal Server Error'}).status(500)
        }
    }
}
export const taskController = new TaskController()