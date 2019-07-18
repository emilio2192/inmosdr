import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseService} from '../../../firebase.service';
import {OwlOptions} from 'ngx-owl-carousel-o';

import * as moment from 'moment';
import {RequestService} from '../../../request.service';

import {Meta} from '@angular/platform-browser';


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
    constructor(private router: Router, private route: ActivatedRoute, private firebaseService: FirebaseService, private request: RequestService, private meta: Meta) {
        this.route.params.subscribe(params => {
            this.title = params.title;
            this.propertyId = params.id;
        });
        this.firebaseService.getCollection().collection('properties').doc('' + this.propertyId).valueChanges().subscribe(response => {
            console.log('propiedades', response);
            this.property = response;
            // @ts-ignore
            // this.meta.addTag({property: 'og:site_name', content: window.location.hostname});
            // // @ts-ignore
            // this.meta.addTag({property: 'og:updated_time', content: Date.now()});
            // // @ts-ignore
            // this.meta.addTag({property: 'og:title', content: response.title});
            // // @ts-ignore
            // this.meta.addTag({property: 'og:description', content: response.description});
            // @ts-ignore
            // tslint:disable-next-line:max-line-length
            this.meta.updateTag({name: 'og:image', property: 'og:image', itemprop: 'image', content: 'http://' + window.location.host + '/sdr/' + response.gallery[0]}, 'name="og:image"');
            // @ts-ignore
            // tslint:disable-next-line:max-line-length
            // this.meta.updateTag({name: 'og:image', property: 'og:image', itemprop: 'image', content: 'http://' + window.location.host + '/sdr/' + response.gallery[0]}, 'name="og:image"');
            // // ts-ignore
            // this.meta.addTag({property: 'og:type', content: 'website'});
            // // ts-ignore
            // this.meta.addTag({property: 'og:url', content: window.location.href});
            // // @ts-ignore
            // this.meta.addTag({itemprop: 'og:site_name', content: window.location.hostname});
            // // @ts-ignore
            // this.meta.addTag({itemprop: 'og:updated_time', content: Date.now()});
            // // @ts-ignore
            // this.meta.addTag({itemprop: 'og:title', content: response.title});
            // // @ts-ignore
            // this.meta.addTag({itemprop: 'og:description', content: response.description});
            // // @ts-ignore
            // // tslint:disable-next-line:max-line-length
            // this.meta.addTag({itemprop: 'og:image', itemprop: 'image', content: 'http://' + window.location.host + '/sdr/' + response.gallery[0]});
            // // ts-ignore
            // this.meta.addTag({itemprop: 'og:type', content: 'website'});
            // // ts-ignore
            // this.meta.addTag({itemprop: 'og:url', content: window.location.href});
            // // @ts-ignore
            // this.meta.addTag({name: 'title', content: response.title});
            // @ts-ignore
            response.gallery.forEach((item, index) => {
                this.property.gallery[index] = '/sdr/' + item;
                console.log('item', item, index);
            });
        });

    }

    ngOnInit() {

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
    };
}
