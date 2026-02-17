import { Routes } from '@angular/router';
import { Home } from './features/pages/home/home';
import { NotFound } from './features/pages/not-found/not-found';
import { PersonInterface } from './features/pages/person-interface/person-interface';
import { StoreInterface } from './features/pages/store-interface/store-interface';
import { UserNewForm } from './features/pages/users/user-new-form/user-new-form';
import { Login } from './features/pages/login/login';
import { Register } from './features/pages/register/register';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { path: "admin", component: StoreInterface},
    { path: "feed", component: PersonInterface},
    { path: "login", component: Login},
    { path: "register", component: Register},
    { path: "home", component: Home},
    { path: "notfound",component: NotFound},
    { path: "signup", component: UserNewForm},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'notfound' }
];
