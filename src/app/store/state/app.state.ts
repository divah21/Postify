// src/app/store/state/app.state.ts
import { UserState } from './user.state';

export interface AppState {
  user: UserState;
}
