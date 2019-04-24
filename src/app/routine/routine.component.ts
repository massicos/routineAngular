import { Component, OnInit, Input } from '@angular/core';

import { Routine } from '../routine';
import { routineStatus } from '../routine';

import { RoutinesService } from '../services/routines.service';

import { Step } from '../Step';
import { stepStatus } from '../Step';
import { Log } from '../Log';
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
  departureTimeHoursMinutes: string = "";
  freeTime: number = 0;
  freeTimeMinutes: String = "0";
  freeTimeSeconds: String = "0";
  totalTime: number = 0;
  totalStars: number = 0;
  medal: boolean = false;
  stepStopTime: number = 0;
  stepRemamingTimeMinutes: String = "0";
  stepRemamingTimeSeconds: String = "0";
  routineTimer;
  subscribeTimer;
  timerLook: string = "timerLook";
  //freeTime: number = 0;
  //status: string = "stop";

  constructor(private routinesService: RoutinesService) { 
    //this.routine.status = "none";
    console.log("constructor");
  }

  onClickSart() {
    this.resetInfo();

    for (let step of this.routine.steps){
      step.status = stepStatus.initial;
    }
    this.routine.status = routineStatus.inProgress;

    this.routineTimer = timer(1000, 1000);
    this.subscribeTimer = this.routineTimer.subscribe(val => {this.myTime(val);});
  }

  addZero(timeInt: number): String {
    let timeStr: String = timeInt.toString();
    if (timeStr.length == 1){
      timeStr = "0" + timeStr;
    }
    return timeStr;
  }

  myTime(val) {
    if (this.routine.status == routineStatus.inProgress) {
      console.log("=== myTime ===");
      //console.log("val = " + val);
      //console.log(this.routine.status);
  
      let d = new Date(Date.now());
      let diff = +this.stepStopTime - +d;
  
      let timeRemaining = diff / 1000;
      this.stepRemamingTimeMinutes = this.addZero(Math.floor(timeRemaining / 60)); // 7
      if (this.stepRemamingTimeMinutes == "0") {
        this.timerLook = "timerLookWarning";
      }
      this.stepRemamingTimeSeconds = this.addZero(Math.trunc(timeRemaining % 60));
  
      this.computeFreeTime(new Date(this.departureTime), new Date(Date.now()));
  
      //console.log(timeRemainingMinutes + ":" + timeRemainingSeconds);
    }
  }


  onClickStepStart(step: Step) {
    console.log(this.routine.status);
    step.status = stepStatus.inProgress;
    this.timerLook = "timerLook"

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
      let log: Log = {"idChild": 1, "stars": step.stars, "medal": 0};
      this.routinesService.stepComplete(log).subscribe();
    }
    else {
      step.status = stepStatus.failed;
    }
    this.totalTime = this.getTotalTime();

    this.computeFreeTime(new Date(this.departureTime), new Date(Date.now()));

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
    let numberOfMedal: number = 0;
    if (medal) {
      numberOfMedal = 1;
    }
    let log: Log = {"idChild": 1, "stars": 0, "medal": numberOfMedal};
    this.routinesService.routineComplete(log).subscribe();
  }

  onClickStepCancel(step: Step) {
    step.status = stepStatus.initial;
  }

  onChangeDepartureTimeHoursMinutes(): void {
    let d = new Date(this.departureTime);
    let strArray: string[] = this.departureTimeHoursMinutes.split(":");
    d.setHours(+strArray[0]);
    d.setMinutes(+strArray[1]);
    
    this.departureTime = +d;
    this.computeFreeTime(new Date(this.departureTime), new Date(Date.now()));
  }

  computeFreeTime(endDate: Date, compareDate: Date) {
    console.log("--- computeFreeTime ---");
    console.log("totalTime = " + this.totalTime);
    console.log("compareDate1 " + compareDate.toLocaleTimeString());
    compareDate.setMinutes(compareDate.getMinutes() + this.totalTime);
    console.log("enDate " + endDate.toLocaleTimeString());
    console.log("compareDate2 " + compareDate.toLocaleTimeString());
    this.freeTime = (+endDate - +compareDate) / 1000;
    this.freeTimeMinutes = this.addZero(Math.floor(this.freeTime / 60)); // 7
    this.freeTimeSeconds = this.addZero(Math.trunc(this.freeTime % 60));
    console.log("freeTime = " + this.freeTime);
    console.log(endDate.getMilliseconds());
    //this.freeTime = 22;
  }

  getTotalTime() {
    var totalTime = 0;
    for (let step of this.routine.steps){
      console.log("getTotalTime - Dans la boucle " + step.status);
      if (step.status == stepStatus.initial
        || step.status == stepStatus.inProgress){
          totalTime += step.time;
        }
    }
    return totalTime;
  }

  resetInfo() {
    for (let step of this.routine.steps){
      //console.log("resetInfo - Dans la boucle 1" + step.status);
      step.status = stepStatus.initial;
    }   

    this.totalTime = this.getTotalTime();
    console.log("totalTime = " + this.totalTime);
      
    this.departureTime =  Date.now();
    var d: Date = new Date(this.departureTime);
    d.setMinutes(d.getMinutes() + this.totalTime + 10);
    this.departureTime = d.getTime();
    this.departureTimeHoursMinutes = this.addZero(d.getHours()) + ":" + this.addZero(d.getMinutes());

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
      console.log("ngOnChanges - resetInfo");
      this.resetInfo();
    }
  }

}
