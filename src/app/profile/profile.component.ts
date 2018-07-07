import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  max: number = 5;
  isReadonly: boolean = true;
  modalRef: BsModalRef;
  value = false;
  profileForm: any;
  constructor(private modalService: BsModalService,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.getProfile();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getProfile() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        let accessToken=JSON.parse(window.localStorage.getItem('token'));
        let headers = new HttpHeaders({'Authorization': `Bearer ${accessToken["result"].access_token}`});
        let options =  {
          headers: headers,
        };
        this.httpClient.get(`http://139.162.53.4/netaji/admin/getProfiles?id=${params['id']}`,options)
          .subscribe((res) => {
            console.log(res);
            if (res && res['profiles'].length) {


            };
          })
      }
    })
  }
}
