import React from 'react';
import { UsersComponent } from '../models';

interface Props extends React.HTMLProps<HTMLSelectElement> {}

class UserSelect extends React.Component<Props> {
  render() {
    return (
      <UsersComponent pollInterval={5000}>
        {({ data, error, loading }) => (
          <React.Fragment>
            {loading && <p>Loading...</p>}
            {error && <p>Failed to load</p>}
            {!loading && !error && (
              <select {...this.props}>
                {data!!.users.map(it => (
                  <option key={it.id} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </select>
            )}
          </React.Fragment>
        )}
      </UsersComponent>
    );
  }
}

export default UserSelect;
