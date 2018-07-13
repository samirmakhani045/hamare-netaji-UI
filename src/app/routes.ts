import {Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {HomeComponent} from './home/home.component';
import { AuthGuard } from './core/config/auth.guard';
import { AnniversaryComponent } from './anniversaries/anninversary.component';


const mainRoute: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', loadChildren: '../app/profile/profile.module#ProfileModule',canActivate: [AuthGuard]},
  { path: 'profile/:id', loadChildren: '../app/profile/profile.module#ProfileModule'},
  { path: 'editprofile', loadChildren: '../app/editprofile/editprofile.module#EditProfileModule',canActivate: [AuthGuard]},
  { path: 'anninversary',  loadChildren: '../app/anniversaries/anninversary.module#AnniversaryModule'}

];


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '', component: MainComponent, children: mainRoute },
 
];
