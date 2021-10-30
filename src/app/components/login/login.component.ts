import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../models/userModel";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({}, [], [])
  submitted = false;
  loading = false;
  userDataModel = new UserModel();

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

    if (this.userService.currentUserValue !== null
      && this.userService.currentUserValue !== undefined) {
      window.location.href = '/my-notes'
    }
  }

  get f() {
    return this.loginForm.controls
  }


  login() {
    this.submitted = true;
    if (this.loginForm?.invalid) {
      return;
    }
    this.loading = true;
    // @ts-ignore
    try {
      // @ts-ignore
      this.userService.login(this.f.email.value, this.f.password.value)
        .subscribe(
          data => {
            console.log("data")
            console.log(data);
            console.log("body")
            console.log(data.body);
            this.userDataModel = data.body? data.body : new UserModel();
            localStorage.setItem('jwtToken', this.userDataModel.jwtToken ? this.userDataModel.jwtToken : '');
            window.location.href = '/my-notes'
          },
          error => {
            console.log("error")
            console.log(error)
          });
    } catch (e) {
      this.loading = false;
      alert(e.message)
      console.log("catch error")
      console.log(e)
    }
  }
}
