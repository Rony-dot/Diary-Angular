# NotepadAngProj

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.9.

## edit the app.component.html
## install bootstrap librarry
### `ng add @ng-bootstrap/ng-bootstrap --project notepad-ang-proj`
## add a component
### `ng g c components/header`
### copy bootstrap navbar in header.component.html
### change the href to routerLink
### copy the header component selector from header.component.ts
for example : selector: 'app-header'; so copy the app-header
### now paste this selector name as a tag into the app.component.html
for example : `<app-header></app-header>`
## add two components to navigate through routerLink
### `ng g c components/home`
### `ng g c components/new-note`
### add the corresponding routing path and component in the app-routing.modules.ts inside Routes array 
for example :   
{ path:'home', component: HomeComponent },
{ path:'new-note', component:NewNoteComponent }
### now add `<router-outlet> </router-outlet>` tag to the app.component.html, this router outlet section will be changed according to the routerLink we click


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
