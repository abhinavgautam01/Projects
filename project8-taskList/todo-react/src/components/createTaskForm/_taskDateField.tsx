import React, { FC, ReactElement, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from "@mui/x-date-pickers";


export const TaskDateField: FC = (): ReactElement=>{

    const [date, setDate] = useState<Date | null>(null)

    return(
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker label="Task Date" format="dd/MM/yyyy" value={date} onChange={(newValue)=>setDate(newValue)} slotProps={{ textField: { fullWidth: true } }}/>
            </LocalizationProvider>
        </>
    )
}