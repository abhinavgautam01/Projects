import { Priority } from "../../createTaskForm/enums/Priority";

export const renderPriorityBorderColor = (priority: string): string=>{
    switch(priority){
        case Priority.high:
            return 'error.light'
        case Priority.normal:
            return 'info.light'
        case Priority.low:
            return 'grey.900'
        default:
            return 'grey.900'
    }
}