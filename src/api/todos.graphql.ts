import gql from 'graphql-tag';

export const TODOS = gql`
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

export const USERS = gql`
  query Users {
    users {
      id
      name
    }
  }
`;

export const TODOS_CHANGES = gql`
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

export const TODO_CREATE = gql`
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

export const TODOS_UPDATE = gql`
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

export const TODO = gql`
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

export const CREATE_TAG = gql`
  mutation CreateTag($name: String!) {
    createTag(input: { name: $name }) {
      id
      name
    }
  }
`;

export const EDIT_TAG = gql`
  mutation EditTag($id: ID!, $name: String!) {
    editTag(input: { id: $id, name: $name }) {
      id
      name
    }
  }
`;

export const TAGS = gql`
  query Tags {
    tags {
      id
      name
    }
  }
`;
