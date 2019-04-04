import { Component, OnInit } from '@angular/core';
import { CHILDS } from '../mock-child';
import { ChildsService } from '../services/childs.service';
import { Child } from '../Child';

@Component({
  selector: 'app-childs-list',
  templateUrl: './childs-list.component.html',
  styleUrls: ['./childs-list.component.css']
})
export class ChildsListComponent implements OnInit {

  childs: Child[] = [
    { "id": 0, "surname": '--', "name": '--', "stars": 0, "medals": 0 },
  ];

  constructor(private childsService: ChildsService) { }

  getChilds(): void {
    this.childsService.getChilds().subscribe(childs => this.childs = childs);
  }

  ngOnInit() {
    this.getChilds();
  }


}
