import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchpol

  constructor(private httpClient: HttpClient, private router: Router) { }
  ngOnInit() {
  }

  searchApi() {

    this.httpClient.get('http://139.162.53.4/netaji/client/searchProfile?keyword=' + this.searchpol)
      .subscribe((res) => {
        console.log(res);
        if (res["profiles"].length > 0) {
          var id = res["profiles"][0].id
          if (id) {
              this.router.navigate(['/profile/'+id])
          }
        }
      });
  }
}
