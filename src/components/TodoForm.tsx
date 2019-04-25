import { CreateTodoComponent, TagsTags } from '../models';
import React, { useState } from 'react';
import TagField from '../components/TagField';

interface Props {
  user: string;
}

interface State {
  text: string;
}

const TodoForm: React.FunctionComponent<Props> = ({ user }: Props) => {
  // const [text, setText] =
  const [text, setText] = useState('');
  const [tags, setTags] = useState<TagsTags[]>([]);
  console.log(tags);
  return (
    <CreateTodoComponent>
      {(createTodo, { loading, error }) => (
        <div>
          <input onChange={e => setText(e.target.value)} />
          <TagField tags={tags} onChanged={setTags} />
          {error && 'Error!'}
          <button
            onClick={e => {
              e.preventDefault();
              createTodo({
                variables: {
                  userId: user,
                  text,
                  tags: tags.map(it => it.id),
                },
              });
            }}
          >
            {loading ? 'Loading' : 'Add Todo'}
          </button>
        </div>
      )}
    </CreateTodoComponent>
  );
};
//
// class TodoForm extends React.Component<Props, State> {
//   readonly state: State = {
//     text: '',
//   };
//
//   setText = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({...this.state, text: event.target.value});
//   };
//
//
//   render() {
//     const {text} = this.state;
//     const {user} = this.props;
//     const [tags, setTags] = useState<TagsTags[]>([]);
//
//     return (
//       <CreateTodoComponent>
//         {(createTodo, {loading, error}) => (
//           <div>
//             <form
//               onSubmit={e => {
//                 e.preventDefault();
//                 createTodo({
//                   variables: {
//                     userId: user,
//                     text,
//                     tags: tags.map(it => it.id)
//                   },
//                 });
//               }}
//             >
//               <input onChange={this.setText}/>
//               <label>
//                 Tags
//                 <TagField tags={tags} onChanged={setTags}/>
//               </label>
//               {error && 'Error!'}
//               <button type="submit">{loading ? 'Loading' : 'Add Todo'}</button>
//             </form>
//           </div>
//         )}
//       </CreateTodoComponent>
//     );
//   }
// }

export default TodoForm;
