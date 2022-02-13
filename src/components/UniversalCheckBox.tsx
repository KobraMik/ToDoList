import React from 'react';
import {Checkbox} from "@material-ui/core";

type propsType = {
    isDone: boolean
    callback: (isDone: boolean)=>void
}

export const UniversalCheckBox = (props: propsType) => {
    const callBackHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked)
    }
    return (
            <Checkbox
                checked={props.isDone}
                color="primary"
                onChange={callBackHandler}
            />
    );
};
