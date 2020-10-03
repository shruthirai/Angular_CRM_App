import { RouterModule, Routes, Router } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './views/home/home.component';
import { CustomerlistComponent } from './views/customerlist/customerlist.component';
import { PermissionsComponent } from './views/permissions/permissions.component';

const route: Routes = [
    {
        path: 'aeyone/app', component: HomeComponent,
        children: [
            {path: 'customerlist', component: CustomerlistComponent},
            {path: 'permission', component: PermissionsComponent}
        ]
    },
    { path: '**', redirectTo: '/aeyone/app/customerlist', pathMatch: 'full' },
    { path: '', redirectTo: '/aeyone/app/customerlist', pathMatch: 'full' },
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(route);
