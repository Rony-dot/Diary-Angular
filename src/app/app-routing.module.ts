import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NewNoteComponent} from "./components/new-note/new-note.component";

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'new-note', component:NewNoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
