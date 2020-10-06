import { RouterModule, Routes, Router } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { CustomerlistComponent } from './views/customerlist/customerlist.component';
import { HomeComponent } from './views/home/home.component';

const route: Routes = [
    {
        path: 'app', component: HomeComponent,
        children: [
            {path: 'customerlist', component: CustomerlistComponent}
        ]
    },
    { path: '**', redirectTo: '/app/customerlist', pathMatch: 'full' },
    { path: '', redirectTo: '/app/customerlist', pathMatch: 'full' },
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(route);
