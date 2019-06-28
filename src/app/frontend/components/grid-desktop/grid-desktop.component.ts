import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../firebase.service';

@Component({
  selector: 'app-grid-desktop',
  templateUrl: './grid-desktop.component.html',
  styleUrls: ['./grid-desktop.component.css']
})
export class GridDesktopComponent implements OnInit {
  properties: Array<any> = [];
  constructor(private firebaseService: FirebaseService) { }

  async ngOnInit() {
    await this.firebaseService.getProperties().snapshotChanges().subscribe(res => {
      res.map(item => {
        this.firebaseService.getCollection().collection('properties').doc('' + item.payload.doc.id).valueChanges().subscribe(response => {
          console.log('item', {id: item.payload.doc.id, data: response});

          this.properties.push({id: item.payload.doc.id, data: response});

        });
      });
    });
  }

}
