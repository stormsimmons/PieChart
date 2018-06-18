import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {

  @Input()
  public left:number;
  
  @Input()
  public top:number;

  @Input()
  public datumn: any;

  constructor() { }

  ngOnInit() {
  }
}
