
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.authService.login({

          username: action.username,
          password: action.password,
        }).then(
         
            (user) => {
              console.log(".then block");
              
                // Navigate to dashboard
                this.router.navigate(['/dashboard']); 
                return loginSuccess({ user });
              },
              (error) => loginFailure({ error })
        )
      ),
      catchError((error) => of(loginFailure({ error })))
    )
  );
}
