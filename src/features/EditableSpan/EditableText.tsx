import TextField from '@mui/material/TextField';
import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableText = React.memo(function ({value, onChange}: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <div onDoubleClick={activateEditMode} style={{
            width: '200px', wordWrap: 'break-word'
        }}>{value}</div>
});
