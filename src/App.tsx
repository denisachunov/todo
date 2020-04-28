import React, { useState, useEffect } from 'react';
import { Table, Button, Header, InputOnChangeData, Icon } from 'semantic-ui-react';
import { EditableField, MessageInfo, TaskAdd } from './components';
import { orderBy } from 'lodash';
import ITask from './interfaces/ITask';
import store from 'store';

export default () => {

  const [ data, setData ]: [ ITask[], Function ] = useState ( [] );
  const [ newTask, setNewTask ] = useState ( '' );

  const orderData = ( data: ITask[] ) => orderBy ( data, 'title', 'desc' );

  useEffect ( () => {
    const todoList = store.get ( 'todo' ) || [];
    setData ( todoList );
  }, [] );

  const newTaskChange = ( e: React.ChangeEvent<HTMLInputElement>, inputData: InputOnChangeData ) => {
    setNewTask ( inputData.value );
  }

  const newTaskAdd = () => {
    if ( newTask.trim().length ) {
      const newData = orderData ([ 
        ...data, 
        { title: newTask, completed: false, editMode: false }
      ]);
      setData ( newData );
      store.set ( 'todo', newData );
      setNewTask ( '' );
    }
  }

  const taskKeyPress = ( index: number ) => ( e: React.KeyboardEvent ) => {
    if ( e.key === 'Enter' ) {
      const newData = orderData ([ ...data ]);
      const task = data [ index ];
      task.editMode = false;
      setData ( newData );
      store.set ( 'todo', data );
    }
  }

  const changeTask = ( index: number ) => ( e: React.ChangeEvent<HTMLInputElement>, inputData: InputOnChangeData ) => {
    const newData = [ ...data ];
    const task = data [ index ];
    task.title = inputData.value;
    setData ( newData );
  }
  const completeTask = ( index: number ) => () => {
    const newData = [ ...data ];
    const task = data [ index ];
    task.completed = !task.completed;
    setData ( newData );
    store.set ( 'todo', data );
  }
  const deleteTask = ( index: number ) => () => {
    const newData = [ ...data ];
    newData.splice ( index, 1 );
    setData ( newData );
    store.set ( 'todo', newData );
  }
  const changeEditMode = ( index: number ) => () => {
    const newData = data.map (( task, i ) => (
      { ...task, editMode: i === index ? !task.editMode : false }
    ));
    setData ( newData );
  }

  const completed = ( done: boolean ) => (
    done ? <Icon color='green' name='checkmark' size='large' /> : <></>
  )

  return (
    <>
      <Header as='h1'>TODO APP</Header>
      <TaskAdd {...{newTaskAdd, newTask, newTaskChange}} />
      {
        data.length ? (
          <Table celled inverted selectable>
            <Table.Body>
              {
                data.map (( task, i ) => (
                  <Table.Row key={i}>
                    <Table.Cell>
                      <EditableField 
                        str={task.title} 
                        editMode={task.editMode} 
                        onChange={changeTask(i)}
                        onKeyPress={taskKeyPress(i)} 
                      />
                    </Table.Cell>
                    <Table.Cell className="complete-cell">
                      {completed ( task.completed )}
                    </Table.Cell>
                    <Table.Cell className="actions-cell">
                      <Button title='Edit task' icon="edit outline" onClick={changeEditMode(i)} />
                      <Button title='Mark as completed' icon="check square outline" onClick={completeTask(i)} />
                      <Button title='Remove task' icon="delete" onClick={deleteTask(i)} />
                    </Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
        ) 
        : <MessageInfo />
      }
    </>
  )
};