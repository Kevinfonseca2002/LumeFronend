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
import { Events } from './shared/children/users/events/events';
import { Feed } from './shared/children/users/feed/feed';
import { Dashboard } from './shared/children/stores/dashboard/dashboard';
import { Attendees } from './shared/children/stores/attendees/attendees';
import { StoreEvents } from './shared/children/stores/store-events/store-events';
import { Settings } from './shared/children/stores/settings/settings';

export const routes: Routes = [
    // Cuando esta Logueado
    {
        path: "admin",
        component: StoreInterface,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['store'] },
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: 'attendees',
                component: Attendees
            },
            {
                path: 'events',
                component: StoreEvents
            },
            {
                path: 'settings',
                component: Settings
            }

        ]
    },
    {
        path: "feed",
        component: PersonInterface,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['user'] },
        children: [
            {
                path: "my-profile",
                component: Profile
            },
            {
                path: 'events',
                component: Events
            },
            {
                path: "main",
                component: Feed
            }

        ]
    },


    //Sin logueo
    { path: "login", component: Login, canActivate: [publicGuardGuard] },
    { path: "register", component: Register, canActivate: [publicGuardGuard] },
    { path: "home", component: Home, canActivate: [publicGuardGuard] },
    { path: "notfound", component: NotFound },
    { path: "signup", component: UserNewForm },

    //Redirecciones
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'notfound' }
];
