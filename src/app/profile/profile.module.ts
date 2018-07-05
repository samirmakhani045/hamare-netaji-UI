import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {RouterModule, Routes} from '@angular/router';
import { RatingModule ,TabsModule} from 'ngx-bootstrap';

const routes: Routes = [
  { path: '', component: ProfileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RatingModule,
    TabsModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
