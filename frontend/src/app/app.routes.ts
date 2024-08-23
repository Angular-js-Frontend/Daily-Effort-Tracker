import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
export const routes: Routes = [
    {path:"",component: HomeComponent},
    {path:"login",component: LoginComponent},
    {path:"signup",component: SignupComponent}
];
