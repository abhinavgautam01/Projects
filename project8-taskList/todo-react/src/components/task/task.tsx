import React, {FC, ReactElement} from "react";
import { Box } from "@mui/material";
import { TaskHeader } from "./_taskHeader";
import { TaskDescription } from "./_taskDescription";
import { TaskFooter } from "./_taskFooter";
import { ITask } from "./interfaces/ITask";
import { Status } from "../createTaskForm/enums/Status";
import { Priority } from "../createTaskForm/enums/Priority";
import PropTypes from "prop-types";
import { renderPriorityBorderColor } from "./helpers/renderPriorityBorderColors";

export const Task: FC<ITask> = (props): ReactElement=>{
    const {title= 'Test Title', date= new Date(), description= 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, id.', priority= Priority.normal , status= Status.completed, onStatusChange= (e)=>console.log(e), onClick= (e)=>console.log(e), id} = props
    return(
        <Box display="flex" width="100%" justifyContent="flex-start" flexDirection="column" mb={4} p={2} sx={{width: '100%', backgroundColor: 'background.paper', borderRadius: '8px', border: '1px solid', borderColor: renderPriorityBorderColor(priority) }}>
            <TaskHeader title={title} date={date}/>
            <TaskDescription description={description}/>
            <TaskFooter id={id} status={status} onClick={onClick} onStatusChange={onStatusChange}/>
        </Box>
    )
}

Task.propTypes = {
    title: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    description: PropTypes.string,
    onStatusChange: PropTypes.func,
    onclick: PropTypes.func,
    priority: PropTypes.string,
    status: PropTypes.string
}