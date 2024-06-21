
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { login } from '../store/auth.actions';
import { Observable } from 'rxjs';
import { AppState } from '../store/state/app.state';
import { selectIsAuthenticated, selectAuthError } from '../store/auth.selectors';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  username: string = '';
  password: string = '';
  isAuthenticated$: Observable<boolean>;
  authError$: Observable<string | null>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.authError$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onLogin() {
    this.store.dispatch(login({ username: this.username, password: this.password }));
   
  }
}

