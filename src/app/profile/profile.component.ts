import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private modalService: BsModalService,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
  ) {
    this.profiledetails = new Profiledetails();
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
        this.httpClient.get(`http://139.162.53.4/netaji/admin/getProfiles?id=${params['id']}`)
          .subscribe((res) => {

            if (res && res['profiles'].length) {
              this.profiledetails = res['profiles'][0].profileDetails;
            }
          });
      }
    });
  }
  test() {
    this.toastrService.success('Login Success', 'Login');
  }
}
export class Profiledetails {

  activities: String;
  age: Number;
  attendenceInHouse: Number;
  campaigns: String;
  countriesVisted: String;
  dateOfDeath: Date;
  dateOfMarriage: Date;
  dob: Date;
  email: String;
  facebookLink: String;
  fatherName: String;
  faxNo: String;
  firstName: String;
  fundReleased: String;
  fundUtilised: String;
  googlePlus: String;
  lastName: String;
  linkedinLink: String;
  maritalStatus: String;
  middleName: String;
  mobileNo: String;
  motherName: String;
  movements: String;
  noOfAssurancesGivenByGovernment: Number;
  noOfBillIntroduced: Number;
  noOfChildren: Number;
  noOfCriminalCases: Number;
  noOfDebates: Number;
  noOfQuestionRaised: Number;
  noOfSpecialMentionsMade: Number;
  occupation: String;
  organisation: String;
  otherInformations: String;
  permanentAddressLandLine: String;
  placeOfBirth: Date;
  placeOrAreaOfInterest: String;
  position: String;
  presentAddress: String;
  presentLandLine: String;
  profilePic: String;
  qualifications: String;
  sal: String;
  socialAndCulturalActivities: String;
  specialInterests: String;
  sports: String;
  spouseName: String;
  state: String;
  totalRecommendedWork: String;
  totalSanctionedWorks: String;
  twitterLink: String;
  website: String;
  websitePlus: String;

}
