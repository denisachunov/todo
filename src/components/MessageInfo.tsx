import React from 'react';
import { Message } from 'semantic-ui-react';

export default () => (
    <Message info>
      <Message.Header>Your todo list is empty</Message.Header>
      <p>Add something by clicking the add button above</p>
    </Message>
)