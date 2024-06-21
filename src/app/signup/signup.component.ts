import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service'; // Adjust the path as needed

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule, // Import ReactiveFormsModule
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Use styleUrls instead of styleUrl
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,  private router: Router ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { username, email, password, confirmPassword } = this.signupForm.value;

      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      const user = {
        username,
        email,
        password
      };

      this.authService.register(user).then(response => {
        console.log('User registered successfully:', response);
        alert('Registration successful!');
        this.router.navigate(['']); 
      }).catch(error => {
        console.error('Error registering user:', error);
        alert('Registration failed.');
      });
    }
  }
}

