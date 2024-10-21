import { createReducer, on } from '@ngrx/store';
import { loadUsersSuccess, loadUsersFailure } from './users.actions';
import { GitHubUser } from '../models/github-user.model';

export interface UsersState {
  users: GitHubUser[];
  error: any;
  nextID: number;
}

export const initialState: UsersState = {
  users: [],
  error: null,
  nextID: 0,
};

export const usersReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: [...state.users, ...users],
    nextID: users.length > 0 ? users[users.length - 1].id : state.nextID,
    error: null,
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
