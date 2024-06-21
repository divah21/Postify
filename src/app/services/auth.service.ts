// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://test.esolutions.co.zw/postify-api/';

  async login(credentials: any): Promise<any> {
    console.log('login function');
    try {
      const response = await axios.post(`${this.apiUrl}auth/login`, qs.stringify(credentials), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log('Login Response:', response);
      
      // Store token in localStorage or any other necessary processing
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        console.log(' Token :' + localStorage.getItem('token'));
      }

      return response.data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error; 
    }
  }


  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }


  isAuthenticated(): boolean {
    
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
