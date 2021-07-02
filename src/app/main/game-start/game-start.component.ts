import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss']
})
export class GameStartComponent implements OnInit {

      htmlStr = '<input id=\'protocol\' value=\'FourOnes\' style=\'width:1px;height:1px; left:-5000px;top:-5000px;position:absolute;\' />';
      constructor(@Inject(MAT_DIALOG_DATA) public data: {htmlStr: string}) {
      }

      ngOnInit(): void {

      }
}
