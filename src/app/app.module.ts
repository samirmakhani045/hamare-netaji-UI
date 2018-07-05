import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './common/login/login.component';
import {CollapseModule, ModalModule,RatingModule} from 'ngx-bootstrap';
import { RegisterComponent } from './common/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    RatingModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule   
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AppModule { }
