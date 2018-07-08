import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  bsModalRef: BsModalRef;
  message: any;
  subscription: Subscription;
  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.subscription = this.authService.getLoginStatus().subscribe(message => { this.message = message; });
  }

  login() {
    this.bsModalRef = this.modalService.show(LoginComponent, /*{class: 'modal-lg'}*/);
  }

  register() {
    this.bsModalRef = this.modalService.show(RegisterComponent);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  logout() {
    this.authService.setLoginStatus(false);
    this.router.navigate(['/home']);
  }
  ngOnInit() {
    const authToken = JSON.parse(window.localStorage.getItem('token'));
    if (authToken != null &&  authToken['result']['access_token']) {
        // logged in so return true
        this.authService.setLoginStatus(true);
    }
    
      console.log(this.message);
  }

}
