import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService} from '../auth.service';

@Component({
  selector: 'app-create-posts',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule, // Import ReactiveFormsModule
  ],
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.css'], // Use styleUrls instead of styleUrl
})
export class CreatePostsComponent implements OnInit {
  createPostForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: AuthService,
    private router: Router // Inject the Router service
  ) {}

  ngOnInit() {
    this.createPostForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      published: [false],
    });
  }

  async onSubmit() {
    if (this.createPostForm.valid) {
      const { title, content, published } = this.createPostForm.value;

      try {
        const createdPost = await this.postService.createPost({ title, content, published });
        console.log('Post created successfully:', createdPost);
        alert('Post created successfully!');
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Error creating post.');
      }
    }
  }
}
