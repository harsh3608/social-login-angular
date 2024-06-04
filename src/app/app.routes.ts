import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

export const routes: Routes = [
    {
        path: 'auth/callback',
        component: AuthCallbackComponent
    }
];
