import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MessagesComponent } from './components/messages/messages.component';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [() => inject(AuthGuard).canActivate()] },
    { path: 'login', component: LoginComponent },
    { path: 'messages', component: MessagesComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
