import { log } from "console";
import { AppDataSource } from "../..";
import { Task } from "./tasks.entity";

export class TaskController {
    constructor(private taskRepository=AppDataSource.getRepository(Task)){}

    public async getAll(): Promise<Task[]>{
        let allTasks: Task[]
        try {
            allTasks = await this.taskRepository.find({
                order: {
                    date: 'ASC'
                }
            })
            
        } catch (errors) {
            console.log(errors);
            
        }
    }
}