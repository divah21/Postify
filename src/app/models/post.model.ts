export interface User {
    username: string;
    email: string;
  }
  
  export interface Post {
    title: string;
    content: string;
    published: boolean;
    id: number;
    created_at: string;
    owner_id: number;
    owner: User;
    votes: number;
  }