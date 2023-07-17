import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { ListingComponent } from './listing/listing.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    ListingComponent,
    AddComponent,
    UpdateComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
