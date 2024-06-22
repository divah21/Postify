
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Post } from './models/post.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://test.esolutions.co.zw/postify-api/';
  private token: string | null = null;

  constructor() {
    if (this.isBrowser()) {
      this.token = localStorage.getItem('token');
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  async register(user: any): Promise<any> {
    const response = await axios.post(`${this.apiUrl}auth/register`, user);
    return response.data;
  }

  getUser(): any {
    if (this.isBrowser()) {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return {};
  }

  isAuthenticated(): boolean {
    return this.isBrowser() && !!localStorage.getItem('user');
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('user');
    }
  }

  async createPost(postData: { title: string; content: string; published: boolean }) {
    try {
      const token = this.token;
      const response = await axios.post(
        `${this.apiUrl}posts`,
        postData,
        {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json' 
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating post', error);
      throw error;
    }
  }

  async getAllPosts(): Promise<Post[]> {
    try {
      const response = await axios.get<Post[]>(`${this.apiUrl}posts`);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching posts', error);
      throw error;
    }
  }

  async upvote(postId: number): Promise<any> {
    try {
      const token = this.token;
      const response = await axios.put(`${this.apiUrl}posts/${postId}/upvote`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error upvoting', error);
      throw error;
    }
  }

  async downvote(postId: number): Promise<any> {
    try {
      const token = this.token;
      const response = await axios.put(`${this.apiUrl}posts/${postId}/downvote`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error downvoting', error);
      throw error;
    }
  }

  async searchPosts(query: string,): Promise<Post[]> {
    try {
      const response = await axios.get<Post[]>(`${this.apiUrl}posts`, {
        params: { query },
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
        
      }
      
    );
    console.log("your data Data:" + response.data);
    return response.data;
     

    } catch (error) {
      console.error('Error searching posts', error);
      throw error;
    }
  }


  
  async getUserPosts(): Promise<Post[]> {
    try {
      const response = await axios.get<Post[]>(`${this.apiUrl}posts`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user posts', error);
      throw error;
    }
  }

  async updatePost(postId: number, postData: { title: string; content: string; published: boolean }): Promise<any> {
    try {
      const response = await axios.put(`${this.apiUrl}posts/${postId}`, postData, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating post', error);
      throw error;
    }
  }

  // Delete a post
  async deletePost(postId: number): Promise<any> {
    try {
      const response = await axios.delete(`${this.apiUrl}posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting post', error);
      throw error;
    }
  }

}
