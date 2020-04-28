import React from 'react';
import { Input, InputOnChangeData } from 'semantic-ui-react';

interface IEditableFieldProps { 
    str: string;
    editMode: boolean;
    onChange: ( e: React.ChangeEvent<HTMLInputElement>, inputData: InputOnChangeData ) => void;
    onKeyPress: ( e: React.KeyboardEvent ) => void;
}

export default ( props: IEditableFieldProps ) => (
    props.editMode ? (
        <Input 
            value={props.str} 
            onChange={props.onChange}
            onKeyPress={props.onKeyPress} 
            autoFocus 
        /> 
    )
    : <>{props.str}</>
)