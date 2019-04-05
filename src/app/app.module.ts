import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FamillyComponent } from './familly/familly.component';

import { FormsModule } from '@angular/forms';
import { ChildsListComponent } from './childs-list/childs-list.component';

import { HttpClientModule }    from '@angular/common/http';
import { RoutineComponent } from './routine/routine.component';
import { AppRoutingModule } from './app-routing.module';
import { RoutineListComponent } from './routine-list/routine-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FamillyComponent,
    ChildsListComponent,
    RoutineComponent,
    RoutineListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
