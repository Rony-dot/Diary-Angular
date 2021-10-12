import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NewNoteComponent} from "./components/new-note/new-note.component";
import {MyNotesComponent} from "./components/my-notes/my-notes.component";
import {LoginComponent} from "./components/login/login.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'new-note', component:NewNoteComponent},
  {path:'my-notes', component: MyNotesComponent},
  {path:'login', component: LoginComponent},
  {path:'logout', component: LogoutComponent},
  {path:'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
