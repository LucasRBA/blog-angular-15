import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayAlert(message: string, seconds: number, backgroundColor:string, condition:boolean): void {
    if (condition) {
    const alertBox = document.createElement('div');
    alertBox.innerText = message;
    alertBox.style.backgroundColor = backgroundColor;
    alertBox.style.padding = '1em';
    alertBox.style.border = '3px solid white';
    alertBox.style.position = 'fixed';
    alertBox.style.top = '3em';
    alertBox.style.right = '3em';
    alertBox.style.zIndex = '9999';
    alertBox.style.borderRadius='5px'
  
    document.body.appendChild(alertBox);
  
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, seconds * 1000);
  }
}

}
