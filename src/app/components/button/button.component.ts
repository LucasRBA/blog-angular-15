import { Component, OnInit, Input} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input()
  buttonLabel:string=""
  @Input()
  color:string=""

  constructor() { }

  ngOnInit(): void {

  }

}


