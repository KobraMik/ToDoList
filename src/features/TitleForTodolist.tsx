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
    return <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 5px'}}>
        <span style={{fontSize: '20px', fontWeight: '700'}}><EditableText value={value} onChange={onChange}/></span>
        <IconButton onClick={() => removeTodolist(id)} disabled={entityStatus === 'loading'}><ClearIcon/></IconButton>
    </div>
});
