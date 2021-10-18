import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bs-alert',
  templateUrl: './bs-alert.component.html',
  styleUrls: ['./bs-alert.component.css']
})
export class BsAlertComponent implements OnInit {
  @Input() alertType: string = ''
  @Input() alertMessage: string = '';

  constructor() { }

  ngOnInit(): void {
  }


}
