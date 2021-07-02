import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-avata-area',
  templateUrl: './avata-area.component.html',
  styleUrls: ['./avata-area.component.scss']
})
export class AvataAreaComponent implements OnInit {

  item_menu: any[] = ["on","","","",""];
  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;
  constructor() { }

  ngOnInit(): void {

  }
}
