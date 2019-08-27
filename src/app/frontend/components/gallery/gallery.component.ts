import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
    @Input() gallery: Array<string>;
    actualItem: string;
    host = 'https://inmobiliariasdr.com/';
    gallerySize: number;
    interval;
    actualIndex = 0;

    constructor() {

    }

    ngOnInit() {
        this.actualItem = this.host + this.gallery[this.actualIndex];
        this.gallerySize = this.gallery.length;
        this.start();
    }

    start = () => {
        this.interval = setInterval(() => {
            if (this.actualIndex < this.gallerySize - 1) {
                this.actualIndex += 1;
            } else {
                this.actualIndex = 0;
            }
            this.actualItem = this.host + this.gallery[this.actualIndex];
        }, 5000);
    }

    pause = () => {
        clearInterval(this.interval);
    }

    thumbnail = (index) => {
        console.log('index', index);
        clearInterval(this.interval);
        this.actualIndex = index;
        this.actualItem = this.host + this.gallery[this.actualIndex];
        this.start();
    }

    prev = () => {
        this.pause();
        if (this.actualIndex - 1 < 0) {
            this.actualIndex = this.gallerySize - 1;
        } else {
            this.actualIndex -= 1;
        }
        this.actualItem = this.host + this.gallery[this.actualIndex];
        this.start();
    }
    next = () => {
        this.pause();
        if (this.actualIndex + 1 > this.gallerySize - 1) {
            this.actualIndex = 0;
        } else {
            this.actualIndex += 1;
        }
        this.actualItem = this.host + this.gallery[this.actualIndex];
        this.start();
    }

}
