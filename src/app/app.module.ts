import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './common/login/login.component';
import { CollapseModule, ModalModule,TabsModule,TypeaheadModule } from 'ngx-bootstrap';
import { RegisterComponent } from './common/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {InterceptorService} from './core/config/interceptor.service';
import { AuthGuard } from './core/config/auth.guard';
import { RatingModule } from 'ngx-bootstrap/rating';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    RatingModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),    
    ToastrModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AppModule { }
