import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Profiledetails } from '../model/Profiledetails';
import { LikeDislikeModel } from '../model/LikeDislikeModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  max = 5;
  isReadonly = false;
  modalRef: BsModalRef;
  value = false;
  profiledetails: any;
  selectedSection = 'update';
  likedislikeModel: any;
  likeCounter: number = 0;
  dislikeCounter: number = 0;
  constructor(private modalService: BsModalService,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
  ) {
    this.profiledetails = new Profiledetails();
    this.likedislikeModel = new LikeDislikeModel();
  }

  ngOnInit() {
    this.getProfile();
  }

  selectSection(section) {
    this.selectedSection = section;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getProfile() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.likedislikeModel.profileId = params['id'];
        console.log(this.likedislikeModel);
        this.httpClient.get(`http://139.162.53.4/netaji/admin/getProfiles?id=${params['id']}`)
          .subscribe((res) => {

            if (res && res['profiles'].length) {
              this.profiledetails = res['profiles'][0].profileDetails;
              this.likeCounter = res['profiles'][0].like;
              this.dislikeCounter = res['profiles'][0].dislike;
            }
          });
      }
    });
  }
  likeProfile() {
    console.log("Like Profile");
    this.likedislikeModel.like = true;
    this.likedislikeModel.dislike = false;
    this.CallAPiLikeDislike();
  }
  dislikeProfile() {
    console.log("Dis Like Profile")
    this.likedislikeModel.dislike = true;
    this.likedislikeModel.like = false;
    this.CallAPiLikeDislike();
  }

  CallAPiLikeDislike() {

    this.httpClient.post('http://139.162.53.4/netaji/client/addLikes', this.likedislikeModel)
      .subscribe((res) => {
        this.getProfile();
      });
  }
  test() {
    this.toastrService.success('Login Success', 'Login');
  }
}

