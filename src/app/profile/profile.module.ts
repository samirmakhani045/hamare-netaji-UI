import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {RouterModule, Routes} from '@angular/router';
import { RatingModule ,TabsModule} from 'ngx-bootstrap';
import { UpdateComponent } from './update/update.component';
import { AboutComponent } from './about/about.component';
import { PersonalComponent } from './personal/personal.component';
import { WorkComponent } from './work/work.component';
import { RatingComponent } from './rating/rating.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ProfileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    RatingModule.forRoot(),
    TabsModule
  ],
  declarations: [ProfileComponent, UpdateComponent, AboutComponent, PersonalComponent, WorkComponent, RatingComponent]
})
export class ProfileModule { }
