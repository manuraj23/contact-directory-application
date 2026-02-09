import { Routes } from '@angular/router';
import { App } from './app';
import { SignupComponent } from './components/signup-component/signup-component';
import { LoginComponent } from './components/login-component/login-component';
import { HomeComponent } from './components/home-component/home-component';
import { NotFound } from './components/not-found/not-found';
import { ProfileComponent } from './components/profile-component/profile-component';
import { LogoutComponent } from './components/logout-component/logout-component';
import { AllApplicationsComponent } from './components/all-applications-component/all-applications-component';
import { UserApplicationsComponent } from './components/user-applications-component/user-applications-component';
import { LeaveWfhApllicationComponent } from './components/leave-wfh-apllication-component/leave-wfh-apllication-component';
import { userAuthGuard } from './guards/user-auth-guard';
import { authGuard } from './guards/auth-guard';
import { hrAuthGuard } from './guards/hr-auth-guard';

export const routes: Routes = [
    { path: "signup", component: SignupComponent},
    { path: "login", component: LoginComponent},
    { path: "profile", component: ProfileComponent, canActivate: [authGuard]},
    { path: "logout", component: LogoutComponent, canActivate: [authGuard]},
    { path: "apply-leave-wfh", component: LeaveWfhApllicationComponent, canActivate: [userAuthGuard]},
    { path: "all-user-applications", component: UserApplicationsComponent, canActivate: [userAuthGuard]},
    { path: "leave-requests", component: AllApplicationsComponent, canActivate: [hrAuthGuard]},
    { path: "", component: HomeComponent, canActivate: [authGuard]},
    { path: "**", component: NotFound},
];
