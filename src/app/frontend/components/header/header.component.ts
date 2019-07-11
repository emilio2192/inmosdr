import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    changeHeader = false;

    constructor(private location: Location) {

    }

    ngOnInit() {
        console.log('actual path ', this.location.path());
        this.changeHeader = this.location.path() !== '';
    }

}
