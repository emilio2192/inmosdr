import {Component, OnInit} from '@angular/core';
import {AboutUs} from '../../../models/aboutUs';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

    expanded = false;
    newTopin: AboutUs;

    constructor() {
    }

    ngOnInit() {
    }

    expand = () => {
        this.expanded = !this.expanded;
    };

}
