import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../../firebase.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

    constructor(private firebaseService: FirebaseService, private route: Router) {

    }

    typeProperties: Array<string> = [];
    operations: Array<string> = [];
    typeSelected = 'default';
    operationSelected = 'default';
    zone = '';
    isMobile = false;
    featureProperties = [];

    async ngOnInit() {
        document.querySelector('body').style.backgroundSize = 'cover';
        if (window.innerWidth > 390) {
            document.querySelector('body').style.backgroundPosition = 'center calc(100% - 190px)';
        } else {
            document.querySelector('body').style.backgroundPosition = '20% 65%';
        }
        this.isMobile = window.innerWidth < 390;
        document.querySelector('body').style.backgroundRepeat = 'no-repeat';

        this.firebaseService.getCollection().collection('home').valueChanges().subscribe(response => {
            console.log('home', environment.hostname);

            // @ts-ignore
            document.querySelector('body').style.backgroundImage = 'url("' + environment.hostname + '/sdr/' + response[0].imagen + '")';
        });
        await this.firebaseService.getProperties().snapshotChanges().subscribe(async (res) => {
            await res.map(item => {
                // tslint:disable-next-line:max-line-length
                this.firebaseService.getCollection().collection('properties').doc('' + item.payload.doc.id).valueChanges().subscribe(response => {
                    // @ts-ignore
                    if (!this.typeProperties.includes('' + response.propertyType)) {
                        // @ts-ignore
                        this.typeProperties.push('' + response.propertyType);
                    }
                    // @ts-ignore
                    if (!this.operations.includes('' + response.operationType)) {
                        // @ts-ignore
                        this.operations.push('' + response.operationType);
                    }
                    // @ts-ignore
                    if (response.promotion === 'true') {
                        // @ts-ignore
                        // tslint:disable-next-line:max-line-length
                        this.featureProperties.push({
                            id: item.payload.doc.id,
                            data: response,
                            // @ts-ignore
                            url: '/propiedad/' + response.title.split(' ').join('_') + '/' + item.payload.doc.id
                        });
                    }
                });
            });
        }, error => console.log(error));
        this.featureProperties.shift();
        console.log('--- feature properties ---', this.featureProperties);
        this.typeProperties.shift();
        this.operations.shift();
    }

    setZone = (event) => {
        this.zone = event.target.value;
    }

    search = () => {

        this.zone = this.zone.replace(' ', '_');
        const url = '/search/' + this.typeSelected + '/' + this.operationSelected + '?zona=' + this.zone;
        window.location.href = url;
    }

}
