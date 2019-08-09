import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseService} from '../../../firebase.service';

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
    contacted = false;
    url: string;

    // tslint:disable-next-line:max-line-length
    constructor(private router: Router, private route: ActivatedRoute, private firebaseService: FirebaseService, private request: RequestService, private meta: Meta) {
        this.route.params.subscribe(params => {
            this.title = params.title;
            this.propertyId = params.id;
        });
        this.firebaseService.getCollection().collection('properties').doc('' + this.propertyId).valueChanges().subscribe(response => {
            this.property = response;
            // tslint:disable-next-line:max-line-length
            this.url = `https://inmobiliariasdr.com/sdr/seo.php?propertyId=${this.propertyId}&title=${encodeURI(this.property.title)}&image=${encodeURI(this.property.gallery[0])}`;
            // @ts-ignore
            response.gallery.forEach((item, index) => {
                this.property.gallery[index] = '/sdr/' + item;
                console.log('item', item, index);
            });
        });

    }

    ngOnInit() {}

    share = (inputElement) => {

        inputElement.select();
        document.execCommand('copy');

        // @ts-ignore
        alert('copy');

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
            this.contacted = true;
        });
    }
}
