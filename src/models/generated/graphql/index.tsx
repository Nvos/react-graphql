// THIS IS A GENERATED FILE, DO NOT EDIT IT!
// tslint:disable
/* eslint-disable */
export type Maybe<T> = T | null;

export interface NewTodo {
  text: string;

  tags: string[];

  userId: string;
}

export interface EditTodo {
  id: string;

  text?: Maybe<string>;

  done?: Maybe<boolean>;

  tags?: Maybe<string[]>;

  lastEditedById: string;
}

export interface NewUser {
  name: string;
}

export interface NewTag {
  name: string;
}

export interface EditTag {
  id: string;

  name: string;
}

export type Time = any;

// ====================================================
// Documents
// ====================================================

export type TodosVariables = {};

export type TodosQuery = {
  __typename?: 'Query';

  todos: TodosTodos[];
};

export type TodosTodos = {
  __typename?: 'Todo';

  id: string;

  text: string;

  done: boolean;

  tags: TodosTags[];

  user: TodosUser;

  createdAt: Time;

  lastEditedBy: Maybe<TodosLastEditedBy>;
};

export type TodosTags = {
  __typename?: 'Tag';

  id: string;

  name: string;
};

export type TodosUser = {
  __typename?: 'User';

  id: string;

  name: string;
};

export type TodosLastEditedBy = {
  __typename?: 'User';

  id: string;

  name: string;
};

export type UsersVariables = {};

export type UsersQuery = {
  __typename?: 'Query';

  users: UsersUsers[];
};

export type UsersUsers = {
  __typename?: 'User';

  id: string;

  name: string;
};

export type TodoChangesVariables = {};

export type TodoChangesSubscription = {
  __typename?: 'Subscription';

  todoChanges: TodoChangesTodoChanges;
};

export type TodoChangesTodoChanges = {
  __typename?: 'Todo';

  id: string;

  text: string;

  done: boolean;

  user: TodoChangesUser;

  tags: TodoChangesTags[];

  createdAt: Time;

  lastEditedBy: Maybe<TodoChangesLastEditedBy>;
};

export type TodoChangesUser = {
  __typename?: 'User';

  id: string;

  name: string;
};

export type TodoChangesTags = {
  __typename?: 'Tag';

  id: string;

  name: string;
};

export type TodoChangesLastEditedBy = {
  __typename?: 'User';

  id: string;

  name: string;
};

export type CreateTodoVariables = {
  text: string;
  userId: string;
  tags: string[];
};

export type CreateTodoMutation = {
  __typename?: 'Mutation';

  createTodo: CreateTodoCreateTodo;
};

export type CreateTodoCreateTodo = {
  __typename?: 'Todo';

  id: string;

  text: string;

  done: boolean;

  user: CreateTodoUser;

  createdAt: Time;

  lastEditedBy: Maybe<CreateTodoLastEditedBy>;
};

export type CreateTodoUser = {
  __typename?: 'User';

  id: string;

  name: string;
};

export type CreateTodoLastEditedBy = {
  __typename?: 'User';

  id: string;

  name: string;
};

export type EditTodoVariables = {
  id: string;
  text?: Maybe<string>;
  done?: Maybe<boolean>;
  lastEditedByID: string;
  tags: string[];
};

export type EditTodoMutation = {
  __typename?: 'Mutation';

  editTodo: Maybe<EditTodoEditTodo>;
};

export type EditTodoEditTodo = {
  __typename?: 'Todo';

  id: string;

  text: string;

  done: boolean;

  user: EditTodoUser;

  createdAt: Time;

  lastEditedBy: Maybe<EditTodoLastEditedBy>;
};

export type EditTodoUser = {
  __typename?: 'User';

  id: string;

  name: string;
};

export type EditTodoLastEditedBy = {
  __typename?: 'User';

  id: string;

  name: string;
};

export type TodoVariables = {
  id: string;
};

export type TodoQuery = {
  __typename?: 'Query';

  todo: Maybe<TodoTodo>;
};

export type TodoTodo = {
  __typename?: 'Todo';

  id: string;

  text: string;

  done: boolean;

  tags: TodoTags[];

  user: TodoUser;

  createdAt: Time;

  lastEditedBy: Maybe<TodoLastEditedBy>;
};

export type TodoTags = {
  __typename?: 'Tag';

  id: string;

  name: string;
};

export type TodoUser = {
  __typename?: 'User';

  id: string;

  name: string;
};

export type TodoLastEditedBy = {
  __typename?: 'User';

  id: string;

  name: string;
};

export type CreateTagVariables = {
  name: string;
};

export type CreateTagMutation = {
  __typename?: 'Mutation';

  createTag: CreateTagCreateTag;
};

export type CreateTagCreateTag = {
  __typename?: 'Tag';

  id: string;

  name: string;
};

export type EditTagVariables = {
  id: string;
  name: string;
};

export type EditTagMutation = {
  __typename?: 'Mutation';

  editTag: Maybe<EditTagEditTag>;
};

export type EditTagEditTag = {
  __typename?: 'Tag';

  id: string;

  name: string;
};

export type TagsVariables = {};

export type TagsQuery = {
  __typename?: 'Query';

  tags: TagsTags[];
};

export type TagsTags = {
  __typename?: 'Tag';

  id: string;

  name: string;
};

import * as ReactApollo from 'react-apollo';
import * as React from 'react';

import gql from 'graphql-tag';

// ====================================================
// Components
// ====================================================

export const TodosDocument = gql`
  query Todos {
    todos {
      id
      text
      done
      tags {
        id
        name
      }
      user {
        id
        name
      }
      createdAt
      lastEditedBy {
        id
        name
      }
    }
  }
`;
export class TodosComponent extends React.Component<
  Partial<ReactApollo.QueryProps<TodosQuery, TodosVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<TodosQuery, TodosVariables>
        query={TodosDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type TodosProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<TodosQuery, TodosVariables>
> &
  TChildProps;
export function TodosHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        TodosQuery,
        TodosVariables,
        TodosProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    TodosQuery,
    TodosVariables,
    TodosProps<TChildProps>
  >(TodosDocument, operationOptions);
}
export const UsersDocument = gql`
  query Users {
    users {
      id
      name
    }
  }
`;
export class UsersComponent extends React.Component<
  Partial<ReactApollo.QueryProps<UsersQuery, UsersVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<UsersQuery, UsersVariables>
        query={UsersDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type UsersProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<UsersQuery, UsersVariables>
> &
  TChildProps;
export function UsersHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UsersQuery,
        UsersVariables,
        UsersProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    UsersQuery,
    UsersVariables,
    UsersProps<TChildProps>
  >(UsersDocument, operationOptions);
}
export const TodoChangesDocument = gql`
  subscription TodoChanges {
    todoChanges {
      id
      text
      done
      user {
        id
        name
      }
      tags {
        id
        name
      }
      createdAt
      lastEditedBy {
        id
        name
      }
    }
  }
`;
export class TodoChangesComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<TodoChangesSubscription, TodoChangesVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<TodoChangesSubscription, TodoChangesVariables>
        subscription={TodoChangesDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type TodoChangesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<TodoChangesSubscription, TodoChangesVariables>
> &
  TChildProps;
export function TodoChangesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        TodoChangesSubscription,
        TodoChangesVariables,
        TodoChangesProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    TodoChangesSubscription,
    TodoChangesVariables,
    TodoChangesProps<TChildProps>
  >(TodoChangesDocument, operationOptions);
}
export const CreateTodoDocument = gql`
  mutation CreateTodo($text: String!, $userId: String!, $tags: [ID!]!) {
    createTodo(input: { text: $text, userId: $userId, tags: $tags }) {
      id
      text
      done
      user {
        id
        name
      }
      createdAt
      lastEditedBy {
        id
        name
      }
    }
  }
`;
export class CreateTodoComponent extends React.Component<
  Partial<ReactApollo.MutationProps<CreateTodoMutation, CreateTodoVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateTodoMutation, CreateTodoVariables>
        mutation={CreateTodoDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type CreateTodoProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateTodoMutation, CreateTodoVariables>
> &
  TChildProps;
export type CreateTodoMutationFn = ReactApollo.MutationFn<
  CreateTodoMutation,
  CreateTodoVariables
>;
export function CreateTodoHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateTodoMutation,
        CreateTodoVariables,
        CreateTodoProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    CreateTodoMutation,
    CreateTodoVariables,
    CreateTodoProps<TChildProps>
  >(CreateTodoDocument, operationOptions);
}
export const EditTodoDocument = gql`
  mutation EditTodo(
    $id: ID!
    $text: String
    $done: Boolean
    $lastEditedByID: ID!
    $tags: [ID!]!
  ) {
    editTodo(
      input: {
        id: $id
        text: $text
        done: $done
        tags: $tags
        lastEditedById: $lastEditedByID
      }
    ) {
      id
      text
      done
      user {
        id
        name
      }
      createdAt
      lastEditedBy {
        id
        name
      }
    }
  }
`;
export class EditTodoComponent extends React.Component<
  Partial<ReactApollo.MutationProps<EditTodoMutation, EditTodoVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<EditTodoMutation, EditTodoVariables>
        mutation={EditTodoDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type EditTodoProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<EditTodoMutation, EditTodoVariables>
> &
  TChildProps;
export type EditTodoMutationFn = ReactApollo.MutationFn<
  EditTodoMutation,
  EditTodoVariables
>;
export function EditTodoHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        EditTodoMutation,
        EditTodoVariables,
        EditTodoProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    EditTodoMutation,
    EditTodoVariables,
    EditTodoProps<TChildProps>
  >(EditTodoDocument, operationOptions);
}
export const TodoDocument = gql`
  query Todo($id: ID!) {
    todo(id: $id) {
      id
      text
      done
      tags {
        id
        name
      }
      user {
        id
        name
      }
      createdAt
      lastEditedBy {
        id
        name
      }
    }
  }
`;
export class TodoComponent extends React.Component<
  Partial<ReactApollo.QueryProps<TodoQuery, TodoVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<TodoQuery, TodoVariables>
        query={TodoDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type TodoProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<TodoQuery, TodoVariables>
> &
  TChildProps;
export function TodoHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        TodoQuery,
        TodoVariables,
        TodoProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    TodoQuery,
    TodoVariables,
    TodoProps<TChildProps>
  >(TodoDocument, operationOptions);
}
export const CreateTagDocument = gql`
  mutation CreateTag($name: String!) {
    createTag(input: { name: $name }) {
      id
      name
    }
  }
`;
export class CreateTagComponent extends React.Component<
  Partial<ReactApollo.MutationProps<CreateTagMutation, CreateTagVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateTagMutation, CreateTagVariables>
        mutation={CreateTagDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type CreateTagProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateTagMutation, CreateTagVariables>
> &
  TChildProps;
export type CreateTagMutationFn = ReactApollo.MutationFn<
  CreateTagMutation,
  CreateTagVariables
>;
export function CreateTagHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateTagMutation,
        CreateTagVariables,
        CreateTagProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    CreateTagMutation,
    CreateTagVariables,
    CreateTagProps<TChildProps>
  >(CreateTagDocument, operationOptions);
}
export const EditTagDocument = gql`
  mutation EditTag($id: ID!, $name: String!) {
    editTag(input: { id: $id, name: $name }) {
      id
      name
    }
  }
`;
export class EditTagComponent extends React.Component<
  Partial<ReactApollo.MutationProps<EditTagMutation, EditTagVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<EditTagMutation, EditTagVariables>
        mutation={EditTagDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type EditTagProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<EditTagMutation, EditTagVariables>
> &
  TChildProps;
export type EditTagMutationFn = ReactApollo.MutationFn<
  EditTagMutation,
  EditTagVariables
>;
export function EditTagHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        EditTagMutation,
        EditTagVariables,
        EditTagProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    EditTagMutation,
    EditTagVariables,
    EditTagProps<TChildProps>
  >(EditTagDocument, operationOptions);
}
export const TagsDocument = gql`
  query Tags {
    tags {
      id
      name
    }
  }
`;
export class TagsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<TagsQuery, TagsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<TagsQuery, TagsVariables>
        query={TagsDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type TagsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<TagsQuery, TagsVariables>
> &
  TChildProps;
export function TagsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        TagsQuery,
        TagsVariables,
        TagsProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    TagsQuery,
    TagsVariables,
    TagsProps<TChildProps>
  >(TagsDocument, operationOptions);
}
