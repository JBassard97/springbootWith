import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Show "Hello World"
    { path: 'about', component: AboutComponent }, // Show "About Page"
    { path: '**', redirectTo: '' } // Redirect unknown paths to home
];
