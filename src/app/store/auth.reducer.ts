
import { createReducer, on, Action } from '@ngrx/store';
import { initialUserState, UserState } from '../store/state/user.state';
import { login, loginSuccess, loginFailure, logout } from '../store/auth.actions';

const userReducer = createReducer(
  initialUserState,
  on(login, state => ({
    ...state,
    error: null
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: null
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(logout, state => ({
    ...state,
    user: null,
    isAuthenticated: false,
    error: null
  }))
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
