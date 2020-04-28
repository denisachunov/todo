import React from 'react';
import { Button, Input, InputOnChangeData } from 'semantic-ui-react';

interface ITaskAddProps {
    newTask: string;
    newTaskAdd: () => void;
    newTaskChange: ( e: React.ChangeEvent<HTMLInputElement>, inputData: InputOnChangeData ) => void;
}

export default ( props: ITaskAddProps ) => {
    const newTaskKeyPress = ( e: React.KeyboardEvent ) => {
        if ( e.key === 'Enter' ) {
            props.newTaskAdd();
        }
    }
    return (
        <div className="new-todo">
            <Button icon='add' onClick={props.newTaskAdd} />
            <Input 
              onChange={props.newTaskChange} 
              onKeyPress={newTaskKeyPress} 
              value={props.newTask} 
              placeholder="Add a task" 
            />
        </div>
    );
}