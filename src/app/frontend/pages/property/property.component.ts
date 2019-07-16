import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseService} from '../../../firebase.service';
import {OwlOptions} from 'ngx-owl-carousel-o';

import * as moment from 'moment';
import {RequestService} from '../../../request.service';

@Component({
    selector: 'app-property',
    templateUrl: './property.component.html',
    styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
    title: string;
    propertyId: string;
    property: any;
    name: string;
    phone: string;
    comment: string;
    email: string;
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

    // tslint:disable-next-line:max-line-length
    constructor(private router: Router, private route: ActivatedRoute, private firebaseService: FirebaseService, private request: RequestService) {
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
                this.property.gallery[index] = '/sdr/' + item;
                console.log('item', item, index);
            });
        });
    }

    contact = async () => {
        const date = moment().format('D-MM-YYYY');

        const data = {
            date,
            name: this.name,
            email: this.email,
            phone: this.phone,
            comment: this.comment,
            propertyId: this.propertyId
        };

        this.firebaseService.getCollection().collection('propertyContacted').add(data);
        const mail = {
            data: {
                email: this.email,
                phone: this.phone,
                name: this.name,
                url: window.location.href,
                content: this.comment
            }
        };
        this.request.otherPost('http://inmobiliariasdr.com/sdr/mail.php', mail).subscribe(res => {
            console.log(res);
        });
    }
}
