import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';


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
  constructor(private httpClient: HttpClient, private router: Router) {

    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    })
      .pipe(
      mergeMap((token: string) => this.getStatesAsObservable(token))
      );
  }
  ngOnInit() {
    this.getProfileList();
  }
  getStatesAsObservable(token: string): Observable<any> {
    this.httpClient.get('http://139.162.53.4/netaji/client/searchProfile?keyword=' + token).subscribe((res) => {
      if (res['profiles'].length > 0) {
        this.statesComplex = [];
        for (let i = 0; i < res['profiles'].length; i++) {
          let temp = {
            id: res['profiles'][i].id,
            name: res['profiles'][i].profileDetails.firstName + '  ' + res['profiles'][i].profileDetails.lastName
          };
          this.statesComplex.push(temp);
        }
      }
    });

    const query = new RegExp(token, 'ig');

    return of(
      this.statesComplex.filter((state: any) => {
        return query.test(state.name);
      })
    );
  }

  getProfileList() {
    this.httpClient.get('http://139.162.53.4/netaji/admin/getProfiles').subscribe((res) => {
      
      if (res && res['profiles'].length) {
      for(var i=0;i<4;i++)
        {
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
