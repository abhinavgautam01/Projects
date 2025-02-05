import React, {FC, ReactElement} from "react";
import { TextField } from "@mui/material";
import { ITextField } from "./interfaces/ITextField";
import PropTypes from "prop-types";

export const TaskDescriptionField: FC<ITextField> = (props): ReactElement=>{
    const { onChange = (e)=>console.log(e),
        disabled = false} = props
    return <TextField id="title" label="Description" placeholder="Description" variant="outlined" size="small" multiline rows={4} fullWidth onChange={onChange} disabled={disabled}/>
}

TaskDescriptionField.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool
}