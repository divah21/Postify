
import { createAction, props } from '@ngrx/store';
import { User } from './state/user.state';

export const login = createAction(
  '[User] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[User] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[User] Logout');
