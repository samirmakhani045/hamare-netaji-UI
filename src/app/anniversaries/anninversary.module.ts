import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnniversaryComponent } from './anninversary.component';
import {RouterModule, Routes} from '@angular/router';
import { TabsModule} from 'ngx-bootstrap';

const routes: Routes = [
  { path: '', component: AnniversaryComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabsModule
  ],
  declarations: [AnniversaryComponent]
})
export class AnniversaryModule { }
