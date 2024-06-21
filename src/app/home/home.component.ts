
import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import { Post } from '../models/post.model';
import {User}  from '../models/post.model'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  searchQuery: string = '';
  username: string | null = '';
  searchResults: Post[] = [];

  constructor(private postService: AuthService,) {}

  async ngOnInit() {
    this.loadUsername();
    try {
      this.posts = await this.postService.getAllPosts();
    } catch (error) {
      console.error('Error loading posts', error);
    }
  }

  // upvote and downvote
  async vote(postId: number, type: 'upvote' | 'downvote') {
    if (type === 'upvote') {
      this.postService.upvote(postId).then(
        response => {
          const post = this.posts.find(post => post.id === postId);
          if (post) {
            post.votes += 1;
          }
        },
        error => {
          console.error('Error upvoting', error);
        }
      );
    } else {
      this.postService.downvote(postId).then(
        response => {
          const post = this.posts.find(post => post.id === postId);
          if (post) {
            post.votes -= 1;
          }
        },
        error => {
          console.error('Error downvoting', error);
        }
      );
    }
  }

  async searchPosts(){
    this.postService.searchPosts(this.searchQuery).then(results => {
      this.searchResults = results;
    }).catch(error => {
      console.error('Error searching posts', error);
    });
  }


  loadUsername() {
    if (typeof window !== 'undefined') {
      this.username = localStorage.getItem('username');
    }
  }
}
