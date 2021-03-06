import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { MyNotesComponent } from './components/my-notes/my-notes.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';

import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BsAlertComponent } from './components/bs-alert/bs-alert.component';
import {NoteDetailsComponent} from "./components/note-details/note-details.component";
import { AuthInterceptorService } from "./services/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NewNoteComponent,
    MyNotesComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    BsAlertComponent,
    NoteDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClientModule,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
