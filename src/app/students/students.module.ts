import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { ListingComponent } from './listing/listing.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListingComponent,
    AddComponent,
    UpdateComponent,
    ViewComponent,
    MenuBarComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    HttpClientModule
  ]
})
export class StudentsModule { }
