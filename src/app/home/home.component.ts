import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HomeService } from '../core/service/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  dataSource: Observable<any>;
  statesComplex: any[] = [];
  trendingProfile: any[] = [];
  trendingInterviews: any[] = [];
  constructor(private httpClient: HttpClient, private router: Router, private homeService: HomeService) {

    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    })
      .pipe(
        mergeMap((token: string) => this.getStatesAsObservable(token))
      );
  }
  ngOnInit() {
    this.trendingProfilelist();
    this.trendingInterviewlist();
  }
  getStatesAsObservable(token: string): Observable<any> {

    return this.homeService.getProfileByName(token).pipe
      (map((response) => {
        return response.body["profiles"];
      }));

  }

  trendingInterviewlist() {
    this.httpClient.get('http://139.162.53.4/netaji/client/getTrendingInterviews').subscribe((res) => {
      console.log(res);
    });
  }
  trendingProfilelist() {
    this.httpClient.get('http://139.162.53.4/netaji/client/getTrendingProfiles').subscribe((res) => {

      if (res && res['profiles'].length) {
        for (var i = 0; i < res['profiles'].length; i++) {
          this.trendingProfile.push(res['profiles'][i])
        }
        console.log(this.trendingProfile);
      }
    });
  }


  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e);
    let id = e.item.id;
    console.log(id);
    this.router.navigate(['/profile/' + id]);
  }
 
  searchApi() { }
}
