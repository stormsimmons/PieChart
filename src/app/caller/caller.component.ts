import { Component, OnInit } from '@angular/core';
import { PieData } from '../pie-chart/pie-data';

@Component({
  selector: 'app-caller',
  templateUrl: './caller.component.html',
  styleUrls: ['./caller.component.css']
})
export class CallerComponent implements OnInit {

  constructor() { }

  public data: PieData[] = [
    new PieData('Market Share', 20000, 'black', 'per capita'),
    new PieData('Company Share', 30000, 'yellow', 'per capita'),
    new PieData('Brand Share', 60000, 'green', 'per capita'),
    new PieData('Country Reports', 70000, 'blue', 'per capita'),
    new PieData('Breifings', 30000, 'pink', 'per capita'),
    new PieData('Analysts', 90000, 'purple', 'per capita'),
    new PieData('Engineering', 12000, 'orange', 'per capita'),
  ]

  public radius: number = 200;

  ngOnInit() {
  }

  onClick(e) {
    console.log("from click: " + e.name)
  }

  onHover(e) {
    console.log("from hover: " + e.name)
  }
}
