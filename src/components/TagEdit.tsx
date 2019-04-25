import {
  CreateTagComponent,
  EditTagComponent,
  TagsComponent,
  TagsTags,
} from '../models';
import React, { useState } from 'react';
import { TAGS } from '../api';

interface TagFieldProps extends React.HTMLProps<HTMLInputElement> {
  tag: TagsTags;
}

const TagFieldEdit: React.FunctionComponent<TagFieldProps> = ({
  tag,
}: TagFieldProps) => {
  const [name, setName] = useState(tag.name);
  return (
    <EditTagComponent>
      {(editTag, { data, loading }) => (
        <div style={{ marginBottom: 6 }}>
          <input value={name} onChange={e => setName(e.target.value)} />
          <button
            onClick={e => {
              editTag({
                variables: {
                  name: name,
                  id: tag.id,
                },
              });
            }}
          >
            save
          </button>
        </div>
      )}
    </EditTagComponent>
  );
};

const TagFieldCreate: React.FunctionComponent = () => {
  const [name, setName] = useState('');

  return (
    <CreateTagComponent
      update={(cache, { data: { createTag } }: any) => {
        const { tags } = cache.readQuery({ query: TAGS }) as any;
        cache.writeQuery({
          query: TAGS,
          data: { tags: tags.concat([createTag]) },
        });
      }}
    >
      {(createTag, { data, loading }) => (
        <React.Fragment>
          <input value={name} onChange={e => setName(e.target.value)} />
          <button
            onClick={e => {
              createTag({
                variables: {
                  name: name,
                },
              });
            }}
          >
            save
          </button>
        </React.Fragment>
      )}
    </CreateTagComponent>
  );
};

const TagEditor: React.FunctionComponent = () => {
  return (
    <TagsComponent pollInterval={5000}>
      {({ data, loading, error }) => (
        <div>
          {!loading && !error && (
            <React.Fragment>
              <p>Edit tags</p>
              {(data as any).tags
                .sort((a: TagsTags, b: TagsTags) => a.id.localeCompare(b.id))
                .map((it: any) => (
                  <TagFieldEdit key={it.id} tag={it} />
                ))}
            </React.Fragment>
          )}
          <p>Create tag</p>
          <TagFieldCreate />
        </div>
      )}
    </TagsComponent>
  );
};

export default TagEditor;
