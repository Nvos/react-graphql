/* eslint-disable react-hooks/rules-of-hooks */
import {
  EditTodoComponent,
  EditTodoMutation,
  EditTodoVariables,
  TodosTodos,
} from '../models';
import React, { useState, useEffect } from 'react';
import TagField from '../components/TagField';
import { MutationChildProps } from '../types';

const EditTodo = (props: OuterProps) => (
  <EditTodoComponent>
    {(editTodo, { ...data }) => (
      <EditTodosInner
        mutate={editTodo}
        {...data}
        todo={props.todo}
        userId={props.userId}
      />
    )}
  </EditTodoComponent>
);

interface OuterProps {
  todo?: TodosTodos;
  userId?: string;
}

interface Props
  extends MutationChildProps<EditTodoMutation, EditTodoVariables>,
    OuterProps {}

const EditTodosInner = (props: Props) => {
  if (!props.todo || !props.userId) {
    return <p>No todo selected</p>;
  }

  const [done, setDone] = useState<any>(false);
  const [text, setText] = useState<any>('');
  const [tags, setTags] = useState<any>([]);

  useEffect(() => {
    if (props.todo) {
      setDone(props.todo.done);
      setText(props.todo.text);
      setTags(props.todo.tags);
    }
  }, [props.todo, props.userId]);

  return (
    <div>
      <h3>Selected {props.todo.text}</h3>
      <div>
        <label>
          Text
          <input
            value={text}
            type={'text'}
            onChange={e => setText(e.target.value)}
          />
        </label>
        <label>
          Done
          <input
            checked={done}
            type={'checkbox'}
            onChange={e => setDone(!done)}
          />
        </label>
        Tags
        <TagField tags={tags} onChanged={setTags} />
      </div>
      <button
        onClick={e => {
          e.preventDefault();
          props.mutate({
            variables: {
              id: props.todo!!.id,
              done,
              text,
              lastEditedByID: props.userId,
              tags: tags.map((it: any) => it.id),
            },
          } as any);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default EditTodo;
