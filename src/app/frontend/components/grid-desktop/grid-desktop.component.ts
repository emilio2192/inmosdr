import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../../firebase.service';

@Component({
    selector: 'app-grid-desktop',
    templateUrl: './grid-desktop.component.html',
    styleUrls: ['./grid-desktop.component.css']
})
export class GridDesktopComponent implements OnInit {
    properties: Array<any> = [];
    typeProperties: Array<any> = [];
    operationProperties = ['alquiler', 'venta'];

    constructor(private firebaseService: FirebaseService) {
    }

    async ngOnInit() {
        await this.firebaseService.getProperties().snapshotChanges().subscribe(res => {
            res.map(item => {
                // tslint:disable-next-line:max-line-length
                this.firebaseService.getCollection().collection('properties').doc('' + item.payload.doc.id).valueChanges().subscribe(response => {
                    this.properties.push({id: item.payload.doc.id, data: response});
                    console.log(response);
                    // @ts-ignore
                    if (!this.typeProperties.includes(response.propertyType)) {
                        // @ts-ignore
                        this.typeProperties.push('' + response.propertyType);
                    }
                });
            });
        });
    }

    redirectProperty = (title, id) => {
        const newTitle = title.split(' ').join('_');
        window.location.href = '/propiedad/' + newTitle + '/' + id;
    };

}
