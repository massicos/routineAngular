import { Component, OnInit, Input } from '@angular/core';

import { Routine } from '../routine';
import { routineStatus } from '../routine';

import { Step } from '../Step';
import { stepStatus } from '../Step';
import { timer } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { Time } from '@angular/common';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})

export class RoutineComponent implements OnInit {

  @Input() routine: Routine;
  departureTime: number =  Date.now();
  freeTime: number = 0;
  freeTimeMinutes: number = 0;
  freeTimeSeconds: number = 0;
  totalTime: number = 0;
  totalStars: number = 0;
  medal: boolean = false;
  stepStopTime: number = 0;
  stepRemamingTimeMinutes: number = 0;
  stepRemamingTimeSeconds: number = 0;
  routineTimer;
  subscribeTimer;
  //freeTime: number = 0;
  //status: string = "stop";

  constructor() { 
    //this.routine.status = "none";
    console.log("constructor");
  }

  onClickSart() {
    this.resetInfo();

    for (let step of this.routine.steps){
      step.status = stepStatus.initial;
    }
    this.routine.status = routineStatus.inProgress;

    //emit 0 after 1 second then complete, since no second argument is supplied
    this.routineTimer = timer(1000, 2000);
    //const source = timer(1000);
    //output: 0
    this.subscribeTimer = this.routineTimer.subscribe(val => {this.myTime(val);});
  }

  myTime(val) {
    console.log("=== myTime ===");
    //console.log("val = " + val);
    //console.log(this.routine.status);

    let d = new Date(Date.now());
    let diff = +this.stepStopTime - +d;

    let timeRemaining = diff / 1000;
    this.stepRemamingTimeMinutes = Math.floor(timeRemaining / 60); // 7
    this.stepRemamingTimeSeconds = timeRemaining % 60;

    //console.log(timeRemainingMinutes + ":" + timeRemainingSeconds);
  }


  onClickStepStart(step: Step) {
    console.log(this.routine.status);
    step.status = stepStatus.inProgress;

    let d = new Date(Date.now());
    this.stepStopTime = +d + (+step.time * 1000 * 60);

    let d2 = new Date(this.stepStopTime);
    console.log("stepStopTime = " + d2.toLocaleTimeString());
  }

  onClickStepStop(step: Step) {
    let d = new Date(Date.now());
    let diff = +this.stepStopTime - +d;

    let d2 = new Date(this.stepStopTime);
    console.log(d.toLocaleTimeString() + " - " + d2.toLocaleTimeString());
    console.log("diff = " + diff);

    if (diff > 0) {
      step.status = stepStatus.success;
      this.totalStars += step.stars;
    }
    else {
      step.status = stepStatus.failed;
    }

    let medal = true;
    for (let step of this.routine.steps){
      if (step.status == stepStatus.initial) {
        return;
      }
      else if (step.status == stepStatus.failed) {
        medal = false;
      }
    }
    this.routine.status = routineStatus.success;
    this.medal = medal;
  }

  onClickStepCancel(step: Step) {
    step.status = stepStatus.initial;
  }
  onChange(newDepartureTime: number): void {
    this.freeTime = +this.freeTime + +newDepartureTime;
  }  

  getFreeTime() {
    //var freeTime: number = 25;
    //1552946147891 
    // 1552946183031 

    console.log(this.departureTime + " " + this.totalTime);
    return this.freeTime;
  }

  computeFreeTime(endDate: Date, compareDate: Date) {
    console.log("--- computeFreeTime ---");
    console.log("totalTime = " + this.totalTime);
    console.log("compareDate1 " + compareDate.toLocaleTimeString());
    compareDate.setMinutes(compareDate.getMinutes() + this.totalTime);
    console.log("enDate " + endDate.toLocaleTimeString());
    console.log("compareDate2 " + compareDate.toLocaleTimeString());
    this.freeTime = (+endDate - +compareDate) / 1000;
    this.freeTimeMinutes = Math.floor(this.freeTime / 60); // 7
    this.freeTimeSeconds = this.freeTime % 60;
    console.log("freeTime = " + this.freeTime);
    console.log(endDate.getMilliseconds());
    //this.freeTime = 22;
  }

  getTotalTime() {
    var totalTime = 0;
    for (let step of this.routine.steps){
      totalTime += step.time;
    }
    return totalTime;
  }

  resetInfo() {
    this.totalTime = this.getTotalTime();
      
    this.departureTime =  Date.now();
    var d: Date = new Date(this.departureTime);
    d.setMinutes(d.getMinutes() + this.totalTime + 10);
    this.departureTime = d.getTime();

    this.computeFreeTime(new Date(this.departureTime), new Date(Date.now()));

    this.routine.status = routineStatus.initial;

    this.totalStars = 0;
    this.medal = false;
  }

  ngOnInit() {
    console.log("ngOnInit");
  }

  ngOnChanges() {
    console.log("ngOnChanges");
    if (this.routine != undefined) {
      this.resetInfo();
    }
  }

}
