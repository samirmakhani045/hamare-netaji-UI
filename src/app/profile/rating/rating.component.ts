import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() profiledetails;
  isReadonly = true;
  max = 5;
  constructor() { }

  ngOnInit() {
  }

}
