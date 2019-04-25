import {
  TodosComponent,
  TodosTodos,
  TodosVariables,
  UsersComponent,
  UsersUsers,
  UsersVariables,
} from '../models';
import React from 'react';
import { adopt } from 'react-adopt';
import { QueryResult } from 'react-apollo';

interface RenderProps {
  todos: QueryResult<TodosTodos, TodosVariables>;
  users: QueryResult<UsersUsers, UsersVariables>;
  // MutationResult can be used for mutation along with mutate fn (which is autogenerated)
}

const Composed = adopt<RenderProps, {}>({
  todos: <TodosComponent />,
  users: <UsersComponent />,
});

const Test = () => (
  <Composed>
    {({ users, todos }) => (
      <div>{/* Render prop variant of multiple graphql render props */}</div>
    )}
  </Composed>
);