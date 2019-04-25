import { TODOS_CHANGES } from '../api';
import { TodosHOC, TodosProps, TodosTodos } from '../models';
import { Card, CardFooter, CardTitle, Tag } from '../ui';
import { produce } from 'immer';
import React from 'react';
import TagEditor from '../components/TagEdit';
import EditTodo from '../components/TodoEdit';
import TodoForm from '../components/TodoForm';
import UserSelect from '../components/UserSelect';

interface Props {}

interface State {
  selectedTodo?: TodosTodos;
  selectedUser: string;
}

class TodoList extends React.Component<TodosProps<Props>, State> {
  readonly state: State = {
    selectedUser: '7a0bd056-7845-4250-89bc-84c9df362774',
  };

  componentWillMount() {
    const { subscribeToMore } = this.props.data as any;
    subscribeToMore({
      document: TODOS_CHANGES,
      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newMessage = subscriptionData.data.todoChanges;

        const newTodos = produce(prev.todos, (draft: any) => {
          const recordIndex = draft.findIndex(
            (it: any) => it.id === newMessage.id,
          );
          if (recordIndex !== -1) {
            draft[recordIndex] = newMessage;
          } else {
            draft.push(newMessage);
          }

          draft.sort((it: any) => it.id);
        });

        return {
          todos: newTodos,
        };
      },
    });
  }

  setUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ ...this.state, selectedUser: event.target.value });
  };

  setSelectedTodo = (todo: TodosTodos) => (event: any) => {
    this.setState({ ...this.state, selectedTodo: todo });
  };

  render() {
    const { todos, loading, error } = this.props.data as any;

    if (loading) {
      return <p>Loading</p>;
    }

    if (error) {
      return <p>Error</p>;
    }

    return (
      <div>
        <div style={{ padding: 12, display: 'flex', justifyContent: 'center' }}>
          <Card>
            <CardTitle>Select user</CardTitle>
            <UserSelect onChange={this.setUser} />
          </Card>
          <Card style={{ width: 400 }}>
            <CardTitle>Create todo</CardTitle>
            <TodoForm user={this.state.selectedUser} />
          </Card>
          <Card>
            <CardTitle>Edit todo</CardTitle>
            <EditTodo
              userId={this.state.selectedUser}
              todo={this.state.selectedTodo}
            />
          </Card>
          <Card>
            <CardTitle>Edit/Create tags</CardTitle>
            <TagEditor />
          </Card>
        </div>
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {todos.map((it: any) => (
            <Card key={it.id} style={{ width: 300 }}>
              <CardTitle>{it.id}</CardTitle>
              <p
                style={{ textDecoration: it.done ? 'line-through' : 'initial' }}
              >
                {' '}
                {it.text}
              </p>
              <div style={{ padding: 12, display: 'flex' }}>
                {it.tags.map((tag: any) => (
                  <Tag key={tag.id}>{tag.name}</Tag>
                ))}
              </div>
              <CardFooter>
                <p>Created by {it.user.name} </p>
                <p>at {it.createdAt}</p>
                {it.lastEditedBy && <p>Last edit by {it.lastEditedBy.name}</p>}
                <button onClick={this.setSelectedTodo(it)}>Edit</button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default TodosHOC({ options: {} })(TodoList);
