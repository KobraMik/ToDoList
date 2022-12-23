import React from 'react';
import IconButton from '@mui/material/IconButton';
import {EditableText} from './EditableSpan/EditableText';
import ClearIcon from '@mui/icons-material/Clear';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    id: string
    entityStatus: string
    removeTodolist: (id: string) => void
}

export const TitleForTodolist = React.memo(({
                                                entityStatus,
                                                id,
                                                removeTodolist,
                                                value,
                                                onChange
                                            }: EditableSpanPropsType) => {
    return <h3>
        <EditableText value={value} onChange={onChange}/>
        <IconButton onClick={() => removeTodolist(id)} disabled={entityStatus === 'loading'}><ClearIcon/></IconButton>
    </h3>
});
