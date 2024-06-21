

// my-posts.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Post } from '../models/post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  posts: Post[] = [];
  editingPostId: number | null = null;
  editedPost: { title: string; content: string; published: boolean } = { title: '', content: '', published: false };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserPosts();
  }

  loadUserPosts(): void {
    this.authService.getUserPosts().then(posts => {
      this.posts = posts;
    }).catch(error => {
      console.error('Error fetching user posts', error);
    });
  }

  editPost(post: Post): void {
    this.editingPostId = post.id;
    this.editedPost = { title: post.title, content: post.content, published: post.published };
  }

  savePost(postId: number): void {
    this.authService.updatePost(postId, this.editedPost).then(() => {
      this.loadUserPosts(); 
      this.cancelEdit();
    }).catch(error => {
      console.error('Error updating post', error);
    });
  }

  deletePost(postId: number): void {
    this.authService.deletePost(postId).then(() => {
      this.loadUserPosts(); 
    }).catch(error => {
      console.error('Error deleting post', error);
    });
  }

  cancelEdit(): void {
    this.editingPostId = null;
    this.editedPost = { title: '', content: '', published: false };
  }
}
