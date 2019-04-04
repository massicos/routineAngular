import { Component, OnInit } from '@angular/core';
import { Familly } from '../familly';
import { FamillyService } from '../familly.service';
import { Routine } from '../routine';

@Component({
  selector: 'app-familly',
  templateUrl: './familly.component.html',
  styleUrls: ['./familly.component.css']
})
export class FamillyComponent implements OnInit {
  familly: Familly = {
    "id": 0,
	  "name": "Vide",
    "valueByStar": 0,
	  "valueByMedal": 0
  };

  constructor(private famillyService: FamillyService) { }

  getFamilly(): void {
    this.famillyService.getFamilly().subscribe(familly => this.familly = familly);
  }

  ngOnInit() {
    this.getFamilly();
  }

}
