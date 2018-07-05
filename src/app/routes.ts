import {Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {HomeComponent} from './home/home.component';

const mainRoute: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', loadChildren: '../app/profile/profile.module#ProfileModule'},
  { path: 'editprofile', loadChildren: '../app/editprofile/editprofile.module#EditProfileModule'}
];


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '', component: MainComponent, children: mainRoute }
];
