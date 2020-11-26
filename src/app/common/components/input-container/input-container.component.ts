import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';


@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent implements OnInit {

  @Input() control: AbstractControl;

  constructor() {
  }

  ngOnInit() {
  }

}
