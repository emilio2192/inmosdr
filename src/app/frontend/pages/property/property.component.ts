import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseService} from '../../../firebase.service';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-property',
    templateUrl: './property.component.html',
    styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
    title: string;
    propertyId: string;
    property: any;
    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: false,
        center: true,
        lazyLoad: true,
        rtl: true,
        autoHeight: false,
        
        navSpeed: 700,
        navText: ['<', '>'],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 1
            },
            740: {
                items: 1
            },
            940: {
                items: 1,
                autoHeight: false
            }
        },
        nav: true
    };

    constructor(private router: Router, private route: ActivatedRoute, private firebaseService: FirebaseService) {
        this.route.params.subscribe(params => {
            this.title = params.title;
            this.propertyId = params.id;
        });
    }

    ngOnInit() {
        this.firebaseService.getCollection().collection('properties').doc('' + this.propertyId).valueChanges().subscribe(response => {
            console.log('propiedades', response);
            this.property = response;
            // @ts-ignore
            response.gallery.forEach((item, index) => {
                this.property.gallery[index] = '//localhost/sdr/' + item;
                console.log('item', item, index);
            });
        });
    }

}
