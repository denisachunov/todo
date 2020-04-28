import React, { useState, useEffect } from 'react';
import { Table, Button, Message, Header, Input, InputOnChangeData, Icon, Popup } from 'semantic-ui-react';
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

  const MessageInfo = () => (
    <Message info>
      <Message.Header>Your todo list is empty</Message.Header>
      <p>Add something by clicking the add button above</p>
    </Message>
  )

  const newTaskAdd = () => {
    if ( newTask.trim().length ) {
      const newData = orderData ([ ...data, { title: newTask, completed: false }]);
      setData ( newData );
      store.set ( 'todo', newData );
      setNewTask ( '' );
    }
  }

  const deleteTask = ( index: number ) => () => {
    const newData = [ ...data ];
    newData.splice ( index, 1 );
    setData ( newData );
    store.set ( 'todo', newData );
  }

  const completed = ( done: boolean ) => (
    done ? <Icon color='green' name='checkmark' size='large' /> : <></>
  )

  return (
    <>
      <Header as='h1'>TODO APP</Header>
      <div className="new-todo">
        <Button icon='add' onClick={newTaskAdd} />
        <Input onChange={newTaskChange} value={newTask} placeholder="Add a todo" />
      </div>
      {
        data.length ? (
          <Table celled inverted selectable>
            <Table.Body>
              {
                data.map (( task, i ) => (
                  <Table.Row key={i}>
                    <Table.Cell>{task.title}</Table.Cell>
                    <Table.Cell>{completed ( task.completed )}</Table.Cell>
                    <Table.Cell>
                      <Popup content='Edit task' trigger={<Button icon="edit outline" />} />
                      <Popup content='Mark as completed' trigger={<Button icon="check square outline" />} />
                      <Popup content='Remove task' trigger={<Button icon="delete" onClick={deleteTask(i)} />} />
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