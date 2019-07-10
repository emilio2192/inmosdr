import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FirebaseService } from '../../../firebase.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  typeOperation: string;
  typeProperty: string;
  zone: string;
  typeProperties: Array<string> = [];
  operations: Array<string> = [];
  locations: Array<string> = [];
  coins: Array<string> = [];
  currency: string = "";
  min: number;
  max:number;
  constructor(private router: Router, private route: ActivatedRoute, private firebaseService: FirebaseService) {
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
    this.firebaseService.getCollection().collection('properties').valueChanges().subscribe(response => {
      response.map(item => {
        console.log('properties ', response);
          // @ts-ignore
          if (!this.typeProperties.includes('' + item.propertyType)) {
              // @ts-ignore
              this.typeProperties.push('' + item.propertyType);
          }
          // @ts-ignore
          if (!this.operations.includes('' + item.operationType)) {
              // @ts-ignore
              this.operations.push('' + item.operationType);
          }
          // @ts-ignore
          if (!this.locations.includes('' + item.location)) {
            // @ts-ignore
            this.locations.push('' + item.location);
          }
          // @ts-ignore
          if (!this.coins.includes('' + item.currency)) {
            // @ts-ignore
            this.coins.push('' + item.currency);
          }
      });
    });
    this.locations.shift();
    this.typeProperties.shift();
    this.operations.shift();
  }

}
