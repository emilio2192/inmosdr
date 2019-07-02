import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../../firebase.service';
import {Router} from '@angular/router';

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

    ngOnInit() {
        document.querySelector('body').style.backgroundImage = 'url("//localhost/sdr/uploads/9055295cf99e28efa75.jpg")';
        document.querySelector('body').style.backgroundSize = 'cover';
        document.querySelector('body').style.backgroundPosition = 'center';
        document.querySelector('body').style.backgroundRepeat = 'no-repeat';
        document.querySelector('body').style.height = '100vh';
        this.firebaseService.getCollection().collection('properties').valueChanges().subscribe(response => {
            response.map(item => {
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
            });
        });
        this.typeProperties.shift();
        this.operations.shift();
    }

    setZone = (event) => {
        this.zone = event.target.value;
    };

    search = () => {

        this.zone = this.zone.replace(' ', '_');
        const url = '/search/' + this.typeSelected + '/' + this.operationSelected + '?zona=' + this.zone;
        window.location.href = url;
    };

}
