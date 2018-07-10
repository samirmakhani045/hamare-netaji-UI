import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Profiledetails } from '../model/Profiledetails';
import { LikeDislikeModel, RatingModel, AddRatingModel } from '../model/LikeDislikeModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  max = 5;
  rateingOfProfile:number=0;
  isReadonly = false;
  modalRef: BsModalRef;
  value = false;
  profiledetails: any;
  selectedSection = 'update';
  likedislikeModel: any;
  likeCounter: number = 0;
  dislikeCounter: number = 0;
  ratingModel: any;
  addRatingModel: any;
  constructor(private modalService: BsModalService,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
  ) {
    this.profiledetails = new Profiledetails();
    this.likedislikeModel = new LikeDislikeModel();
    this.ratingModel = new RatingModel();
    this.addRatingModel = new AddRatingModel();
  }

  ngOnInit() {
    this.setRatingModel();
    this.getProfile();
  }

  selectSection(section) {
    this.selectedSection = section;
  }
  addRating() {
    var sum = this.ratingModel.overallRating + this.ratingModel.personalImage + this.ratingModel.PartyOrganisat + this.ratingModel.qualification
      + this.ratingModel.honesty + this.ratingModel.accessibility + this.ratingModel.workPerformance + this.ratingModel.transparency;
    var avg = sum / 8;
    this.addRatingModel.rating = avg;
    this.httpClient.post('http://139.162.53.4/netaji/client/addRating', this.addRatingModel)
      .subscribe((res) => {
        this.modalService.hide(1);
        this.getProfile();
      });
  }
  closeRating() {
    this.modalService.hide(1);
  }
  setRatingModel() {
    this.ratingModel.overallRating = 0;
    this.ratingModel.personalImage = 0;
    this.ratingModel.PartyOrganisat = 0;
    this.ratingModel.qualification = 0;
    this.ratingModel.honesty = 0;
    this.ratingModel.accessibility = 0;
    this.ratingModel.workPerformance = 0;
    this.ratingModel.transparency = 0;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getProfile() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.likedislikeModel.profileId = params['id'];
        this.addRatingModel.profileId = params['id'];
        console.log(this.likedislikeModel);
        this.httpClient.get(`http://139.162.53.4/netaji/admin/getProfiles?id=${params['id']}`)
          .subscribe((res) => {

            if (res && res['profiles'].length) {
              this.profiledetails = res['profiles'][0].profileDetails;
              this.likeCounter = res['profiles'][0].like;
              this.dislikeCounter = res['profiles'][0].dislike;
              this.rateingOfProfile=res['profiles'][0].rating;
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

