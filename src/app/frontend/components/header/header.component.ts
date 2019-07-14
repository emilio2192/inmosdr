import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    changeHeader = false;
    mobileExpanded = false;
    constructor(private location: Location) {
    }

    ngOnInit() {
        console.log('actual path ', this.location.path());
        this.changeHeader = this.location.path() !== '';
    }
    expand = () => {
        this.mobileExpanded = !this.mobileExpanded;
    }


}
