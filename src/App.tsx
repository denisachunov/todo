import React, { useState, useEffect } from 'react';
import { Table, Button, Popup, Message, Header, Input } from 'semantic-ui-react';
import store from 'store';

export default () => {

  const [ data, setData ] = useState ([]);

  useEffect ( () => setData ( store.get ( 'user' )), [] );

  const AddBtn = () => {
    const markup = (
      <div className="new-todo">
        <Button icon='add' />
        <Input />
      </div>
    );
    return (
      <Popup
        trigger={markup}
        content="Add a todo"
        basic
      />
    );
  }
    
  const MessageInfo = () => (
    <Message info>
      <Message.Header>Your todo list is empty</Message.Header>
      <p>Add something by clicking the add button above</p>
    </Message>
  )

  return (
    <>
      <Header as='h1'>TODO APP</Header>
      <AddBtn />
      <MessageInfo />
      {/* <Table celled inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        </Table.Body>
      </Table> */}
    </>
  )
};