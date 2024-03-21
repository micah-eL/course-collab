import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MessagesComponent } from './components/messages/messages.component';
import { CourseRegComponent } from './components/course-reg/course-reg.component';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [() => inject(AuthGuard).canActivate()] },
    { path: 'login', component: LoginComponent },
    { path: 'messages', component: MessagesComponent},
    { path: 'course-reg', component: CourseRegComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
