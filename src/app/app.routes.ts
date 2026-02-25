import { Routes } from '@angular/router';
import { Home } from './features/pages/home/home';
import { NotFound } from './features/pages/not-found/not-found';
import { PersonInterface } from './features/pages/person-interface/person-interface';
import { StoreInterface } from './features/pages/store-interface/store-interface';
import { UserNewForm } from './features/pages/users/user-new-form/user-new-form';
import { Login } from './features/pages/login/login';
import { Register } from './features/pages/register/register';
import { authGuard } from './core/guards/auth-guard';
import { publicGuardGuard } from './core/guard/public-guard-guard';
import { roleGuard } from './core/guard/role-guard';
import { Profile } from './shared/children/users/profile/profile';
import { Chats } from './shared/children/users/chats/chats';
import { Events } from './shared/children/users/events/events';
import { Feed } from './shared/children/users/feed/feed';

export const routes: Routes = [
    // Cuando esta Logueado
    { 
    path: "admin",
    component: StoreInterface,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['store']}
    },
    { 
    path: "feed", 
    component: PersonInterface,
    //TODO: Hacer que solo los usuarios con rol "user" puedan acceder a esta ruta 
    // canActivate: [authGuard, roleGuard],
    // data: { roles: ['user']}
    children: [
        {
            path: "my-profile",
            component: Profile
        },
        {
            path: "chats",
            component: Chats
        },
        {
            path: 'events',
            component: Events
        },
        {
            path:"main",
            component: Feed
        }

    ]
    },
    
    
    //Sin logueo
    { path: "login", component: Login, canActivate: [publicGuardGuard]},
    { path: "register", component: Register, canActivate: [publicGuardGuard]},
    { path: "home", component: Home, canActivate: [publicGuardGuard]},
    { path: "notfound",component: NotFound},
    { path: "signup", component: UserNewForm},

    //Redirecciones
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'notfound' }
];
