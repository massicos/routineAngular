import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FamillyComponent } from '../app/familly/familly.component';
import { RoutineListComponent } from '../app/routine-list/routine-list.component';

const routes: Routes = [
  { path: 'home', component: FamillyComponent },
  { path: 'routine-list', component: RoutineListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
