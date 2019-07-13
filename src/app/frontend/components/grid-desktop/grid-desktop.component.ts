import {Component, OnInit, Input, SimpleChanges} from '@angular/core';
import {FirebaseService} from '../../../firebase.service';
import * as _ from 'lodash';
import {Property} from '../../../models/property';

@Component({
    selector: 'app-grid-desktop',
    templateUrl: './grid-desktop.component.html',
    styleUrls: ['./grid-desktop.component.css']
})
export class GridDesktopComponent implements OnInit {
    @Input() typeProperty;
    @Input() operationType;
    @Input() location;
    @Input() currency;
    @Input() minPrice;
    @Input() maxPrice;
    properties: Array<any> = [];
    typeProperties: Array<any> = [];
    operationProperties = ['alquiler', 'venta'];
    hosting = '192.168.2.114';

    constructor(private firebaseService: FirebaseService) {

    }


    async ngOnInit() {

        this.properties = [];
        this.typeProperties = [];
        let flag = true;
        await this.firebaseService.getProperties().snapshotChanges().subscribe(async (res) => {
            await res.map(item => {
                flag = true;
                // tslint:disable-next-line:max-line-length
                this.firebaseService.getCollection().collection('properties').doc('' + item.payload.doc.id).valueChanges().subscribe(response => {
                    flag = this.validateToPush(response as Property);
                    if (flag) {
                        this.properties.push({id: item.payload.doc.id, data: response});
                    }
                    // @ts-ignore
                    if (!this.typeProperties.includes(response.propertyType)) {
                        // @ts-ignore
                        this.typeProperties.push('' + response.propertyType);
                    }
                });
            });
        }, error => console.log(error));
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnChanges(changes: SimpleChanges) {
        console.log('change detected');
        for (let propName in changes) {
            let chng = changes[propName];
            let cur = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);
            if (prev !== undefined) {
                this.ngOnInit();
            }
        }
    }

    redirectProperty = (title, id) => {
        const newTitle = title.split(' ').join('_');
        window.location.href = '/propiedad/' + newTitle + '/' + id;
    };

    validateToPush = (property: Property): boolean => {
        console.log(property);
        if (this.currency.length > 0 && this.currency !== property.currency) {
            return false;
        }
        if (this.operationType !== 'default' && this.operationType !== property.operationType) {
            return false;
        }
        if (this.typeProperty !== 'default' && this.typeProperty !== property.propertyType) {
            return false;
        }
        if ((this.minPrice !== undefined && this.minPrice !== '') && +property.price < +this.minPrice) {
            return false;
        }
        if ((this.maxPrice !== undefined && this.maxPrice !== '') && +property.price > +this.maxPrice) {
            return false;
        }
        if ((this.location !== undefined && this.location !== '') && property.location !== this.location) {
            return false;
        }
        return true;

    };
}
