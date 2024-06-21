
export interface User {
  id: string;
  username: string;
  // Add other user properties as needed
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  user: null,
  isAuthenticated: false,
  error: null,
};
