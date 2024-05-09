import { Routes } from '@angular/router';
import { NavigationComponent } from './dashboard/navigation/navigation.component';
import { AuthLayoutComponent } from './auth/layout/auth-layout.component'
import { LoginComponent } from './auth/pages/login/login.component';
import { AuthGuard } from './auth/services/auth.guard';
import {IndexProductComponent} from './dashboard/component/index-product/index-product.component';
import {UsersComponent} from './auth/pages/users/users.component';
import {ProfileComponent} from './auth/pages/profile/profile.component';
import {guardCheckGuard} from './auth/services/guard-check.guard'

export const routes: Routes = [
{ 
    path: 'auth', component: AuthLayoutComponent, 
    children: [
        {
            path: 'login',
            title: 'login',
            // loadComponent: () => import('./dashboard/pages/reservations-page/reservations-page.component'),
            component: LoginComponent
        },
    ]
}, 
{ 
    path: 'nav', component: NavigationComponent,canActivate: [AuthGuard],
    children: [
            {
                path: 'products',
                title: 'products',
                component: IndexProductComponent
            },
            {
                path: 'users',
                title: 'users',
                component: UsersComponent,data: { rol:'admin' },canActivate:[guardCheckGuard],
            },
            {
                path: 'user',
                title: 'user',
                component: ProfileComponent,
            },

    ]
}, 



{ path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];
