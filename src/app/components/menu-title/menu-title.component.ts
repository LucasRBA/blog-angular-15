import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';


@Component({
  selector: 'app-menu-title',
  templateUrl: './menu-title.component.html',
  styleUrls: [
  './menu-title.component.css',
  './menu-title.responsive.component.css'
  ]

})


export class MenuTitleComponent implements OnInit {

  @Input()
  blogTitle:string="Kira's Blog"

  constructor() { }

  ngOnInit(): void {
  }

}

