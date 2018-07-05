import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  login() {
    this.bsModalRef = this.modalService.show(LoginComponent, /*{class: 'modal-lg'}*/);
  }

  register() {
    this.bsModalRef = this.modalService.show(RegisterComponent);
  }

  ngOnInit() {
  }

}
