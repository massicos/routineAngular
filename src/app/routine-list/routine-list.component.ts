import { Component, OnInit } from '@angular/core';
import { RoutinesListService } from '../services/routines-list.service';
import { Routine } from '../routine';

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.css']
})
export class RoutineListComponent implements OnInit {

  routines: Routine[] = [{
    "id": 0,
    "name": "Vide",
    "status": "stop",
    "steps": [ {"id": 0, "name": "Vide", "status": "stepNotDone", "time": 0, "stars": 0}]
  }];

  selectedRoutine: Routine;

  constructor(private routinesListService: RoutinesListService) { }

  onSelect(routine: Routine): void {
    this.selectedRoutine = routine;
  }

  getRoutinesList(): void {
    this.routinesListService.getRoutinesList().subscribe(routines => this.routines = routines);
  }

  ngOnInit() {
    this.getRoutinesList();
  }

}
