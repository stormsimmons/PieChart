import { Component, OnChanges, Input, EventEmitter, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import * as d3 from 'd3';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { PieData } from './pie-data';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnChanges {

  @Input()
  public radius;

  @Input()
  public data: PieData[];

  @Input()
  public transitionDuration: number;

  @Output()
  public onClick:EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onHover:EventEmitter<any> = new EventEmitter<any>();

  public mouseMoveObs: Observable<any> = fromEvent(document.body, 'mousemove');
  public mouseMoveSub: Subscription;
  public pointerX: number
  public pointerY: number
  public toolTipDatumn: any;
  public showToolTip: boolean = false;

  constructor(public detector:ChangeDetectorRef) { }

  public ngOnChanges(change :SimpleChanges):void {
    if (change.hasOwnProperty('data')) {
      this.draw();
    }
  }

  private getSum():number {
    let sum = 0;
    this.data.forEach(x => {
      sum += x.value;
    })

    return sum;
  }

  private getPercentages(): void {
    let sum = this.getSum();

    this.data.forEach(x => {
      x.percentage = (x.value / sum) * 100;
    })
  }

  private buildAngles():void {

    this.getPercentages()
    let total = Math.PI * 2;

    let nextStart = 0;
    this.data.forEach(x => {

      let percentageVal = (x.percentage / 100) * total;

      x.startAngle = nextStart;
      x.endAngle = percentageVal + nextStart;

      nextStart = x.endAngle;
    })

  }

  private getTheArc(datumn: PieData) :string {
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
      .startAngle(datumn.startAngle)
      .endAngle(datumn.endAngle);

    return arc(<any>datumn);
  }

  private draw(): void {
    const svg = d3.selectAll('svg')
      .attr('height', (this.radius + 50) * 2)
      .attr('width', (this.radius + 50) * 2);

    const width = + svg.attr('width');

    this.buildAngles()

    const height = + svg.attr('height');

    const g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    g.selectAll('path')
      .data(this.data)
      .enter()
      .append('path')
      .style('fill', d => d.colour)
      .style('opacity', 0)
      .attr('d', (d) => this.getTheArc(d))
      .attr('id', d => d.name)
      .on('mouseover', d => {
        this.toolTipDatumn = d;
        this.showToolTip = true;

        this.mouseMoveSub = this.mouseMoveObs.subscribe(x => {
          this.pointerX = x.clientX - 80
          this.pointerY = x.clientY - 80
        });

        this.onHover.emit(d);
      })
      .on('mouseout', d => {
        this.showToolTip = false
        this.mouseMoveSub.unsubscribe();
      })
      .on('click', d => {
        this.onClick.emit(d);
       this.detector.detectChanges();
       g.remove();
       this.draw()
      })
      .transition()
      .duration(this.transitionDuration)
      .style('opacity', 1);
  }
}
