import { MutateProps, MutationResult } from 'react-apollo';

export type MutationChildProps<D, V> = MutationResult<D> & MutateProps<D, V>;
