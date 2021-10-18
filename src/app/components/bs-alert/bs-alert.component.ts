import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bs-alert',
  templateUrl: './bs-alert.component.html',
  styleUrls: ['./bs-alert.component.css']
})
export class BsAlertComponent implements OnInit {
  alertType: any;
  alertMessage: any;

  constructor() { }

  ngOnInit(): void {
  }

  
}
