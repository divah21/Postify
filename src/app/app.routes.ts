import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { CreatePostsComponent } from './create-posts/create-posts.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: '', component: SigninComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'my-post', component: MyPostsComponent },
      { path:'', component:HomeComponent},
      { path: 'create-post', component: CreatePostsComponent },
      { path: '**', redirectTo: '/dashboard/create-post' },
      { path: '**', redirectTo: '/dashboard/my-post' },
      { path: '**', redirectTo: '/dashboard' },
    ],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
  { path: '**', redirectTo: '/signup' },
  
  
];
