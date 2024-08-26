import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
    {path:"",component: HomeComponent,canActivate: [authGuard]},
    {path:"login",component: LoginComponent},
    {path:"signup",component: SignupComponent}
];
