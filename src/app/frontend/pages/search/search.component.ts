import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  typeOperation: string;
  typeProperty: string;
  zone: string;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.typeOperation = params.operation;
      this.typeProperty = params.type;
      this.zone = params.zona;
    });
    route.queryParams.subscribe((params) => {
      this.zone = params.zona.replace('_', ' ');

    });

  }

  ngOnInit() {
    console.log(this.typeOperation, '-_-_', this.typeProperty, '****', this.zone);
    // @ts-ignore
    document.querySelector('.header').style.boxShadow = '0px 0px 15px #e1e1e1';
    // @ts-ignore
    document.querySelector('.header').style.borderBottomLeftRadius = '10px';
    // @ts-ignore
    document.querySelector('.header').style.borderBottomRightRadius = '10px';
  }

}
