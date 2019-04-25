import {
  CreateTodoCreateTodo,
  EditTodoEditTodo,
  TagsComponent,
  TagsTags,
} from '../models';
import { Tag } from '../ui';
import React from 'react';

interface Props {
  tags: TagsTags[];
  onChanged: (tags: TagsTags[]) => void;
}

interface State {
  selectedTag?: TagsTags;
}

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  tags: TagsTags[];
  selectedTag: TagsTags;
}

const TagSelect: React.FunctionComponent<SelectProps> = ({
  tags,
  selectedTag,
  ...rest
}: SelectProps) => (
  <select {...rest}>
    <option value={undefined}>Not selected</option>
    {tags.map(it => (
      <option key={it.id} value={JSON.stringify(it)}>
        {it.name}
      </option>
    ))}
  </select>
);

class TagField extends React.Component<Props, State> {
  readonly state: State = {
    selectedTag: undefined,
  };

  emitAdd = () => {
    console.log(this.state);
    if (this.state.selectedTag) {
      if (
        this.props.tags.findIndex(
          it => it.id === this.state.selectedTag!!.id,
        ) === -1
      ) {
        this.props.onChanged([...this.props.tags, this.state.selectedTag]);
      }
    }
  };

  emitRemove = (id: string) => (_: any) => {
    this.props.onChanged(this.props.tags.filter(it => it.id !== id));
  };

  onSelectionChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const result: TagsTags = JSON.parse(event.target.value);
    console.log(result);
    this.setState({
      selectedTag: result,
    });
  };

  render() {
    return (
      <div>
        <TagsComponent pollInterval={5000}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <div>Error</div>;
            if (data) {
              return (
                <React.Fragment>
                  <TagSelect
                    selectedTag={data.tags[0]}
                    onChange={this.onSelectionChanged}
                    tags={data.tags}
                  />
                  <button onClick={this.emitAdd}>Add</button>
                  <div style={{ display: 'flex' }}>
                    {this.props.tags
                      .sort((a, b) => a.id.localeCompare(b.id))
                      .map(it => (
                        <Tag key={it.id}>
                          {it.name}
                          <button
                            onClick={this.emitRemove(it.id)}
                            style={{ border: 'none', backgroundColor: 'none' }}
                          >
                            &#10005;
                          </button>
                        </Tag>
                      ))}
                  </div>
                </React.Fragment>
              );
            }
          }}
        </TagsComponent>
      </div>
    );
  }
}

export default TagField;
