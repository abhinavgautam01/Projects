import React, {FC, ReactElement, useState, useEffect, useContext } from "react";
import {Box, Typography, Stack, LinearProgress, Button, Alert, AlertTitle} from "@mui/material";
import { TaskTitleField } from "./_taskTitleField";
import { TaskDescriptionField } from "./_taskDescriptionField";
import { TaskDateField } from "./_taskDateField";
import { TaskSelectField } from "./_taskSelectField";
import { Status } from "./enums/Status";
import { Priority } from "./enums/Priority";
import { useMutation } from "@tanstack/react-query";
import { sendApiRequest } from "../../helpers/sendApiRequest";
import { ICreateTask } from "../taskArea/interfaces/ICreateTask";
import { ITaskTemp } from "../taskArea/interfaces/ITaskTemp";
import { TaskStatusChangedContext } from "../../context";

export const CreateTaskForm: FC = (): ReactElement=>{
    
    const [title, setTitle] = useState<string|undefined>(undefined)
    const [description, setDescription] = useState<string|undefined>(undefined)
    const [date, setDate] = useState<Date|null>(new Date())
    const [status, setStatus] = useState<string>(Status.todo)
    const [priority, setPriority] = useState<string>(Priority.normal)
    const [showSuccess, setShowSuccess] = useState<boolean>(false)

    const tasksUpdatedContext = useContext(TaskStatusChangedContext)

    const createTaskMutation = useMutation({
        mutationFn: (data: ICreateTask) => sendApiRequest<ITaskTemp>('http://localhost:3200/tasks', 'POST', data)
    });
    
    function createTaskHandler(){
        if(!title || !date || !description){
            return
        }

        const task: ICreateTask = {
            title, description, date: date.toString(), status, priority
        }
        createTaskMutation.mutate(task)
    }

    /*
        *Manage Side Effects inside the application
    */
    useEffect(() => {
      if(createTaskMutation.isSuccess){
        setShowSuccess(true)
        tasksUpdatedContext.toggle()
      }

      const successTimeout = setTimeout(()=>{
        setShowSuccess(false)
      },4000)
      return ()=>{
        clearTimeout(successTimeout)
      }

    }, [createTaskMutation.isSuccess])
    

    return(
        <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%" px={4} my={6}>
            {showSuccess && <Alert severity="success" sx={{width: '100%', marginBottom: '16px'}}>
                <AlertTitle>Success</AlertTitle>
                The task has been created successfully
            </Alert>}
            
            <Typography mb={2} component="h2" variant="h6">
                Create a Task
            </Typography>
            <Stack sx={{width: '100%'}} spacing={2}>
                <TaskTitleField onChange={(e)=>setTitle(e.target.value)} disabled={createTaskMutation.isPending}/>
                <TaskDescriptionField onChange={(e)=>setDescription(e.target.value)} disabled={createTaskMutation.isPending}/>
                <TaskDateField value={date} onChange={(date)=>setDate(date)} disabled={createTaskMutation.isPending}/>
                <Stack sx={{width: '100%'}} direction="row" spacing={2}>
                    <TaskSelectField disabled={createTaskMutation.isPending} label="Status" name="status" value={status} onChange={(e)=>setStatus(e.target.value as string)} items={[{value: Status.todo, label: Status.todo.toUpperCase()}, {value: Status.inProgress, label: Status.inProgress.toUpperCase()}]}/>
                    <TaskSelectField disabled={createTaskMutation.isPending} label="Priority" name="priority" value={priority} onChange={(e)=>setPriority(e.target.value as string)} items={[{value: Priority.low, label: Priority.low}, {value: Priority.normal, label: Priority.normal}, {value: Priority.high, label: Priority.high}]}/>
                </Stack>
                {createTaskMutation.isPending && <LinearProgress/>}
                
                <Button disabled={!title || !description || !date || !status || !priority} onClick={createTaskHandler} variant="contained" size="large" fullWidth>Create a Task</Button>
            </Stack>
        </Box>
    )
}