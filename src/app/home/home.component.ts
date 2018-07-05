import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchpol

  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
  }

  searchApi() {

    this.httpClient.get('http://139.162.53.4/netaji/client/searchProfile?keyword=' + this.searchpol)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
