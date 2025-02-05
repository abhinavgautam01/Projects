import React, {FC, ReactElement} from "react";
import {Box, Typography, Stack} from "@mui/material";
import { TaskTitleField } from "./_taskTitleField";
import { TaskDescriptionField } from "./_taskDescriptionField";
import { TaskDateField } from "./_taskDateField";

export const CreateTaskForm: FC = (): ReactElement=>{
    return(
        <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%" px={4} my={6}>
            <Typography mb={2} component="h2" variant="h6">
                Create a Task
            </Typography>
            <Stack sx={{width: '100%'}} spacing={3}>
                <TaskTitleField/>
                <TaskDescriptionField/>
                <TaskDateField/>
            </Stack>
        </Box>
    )
}