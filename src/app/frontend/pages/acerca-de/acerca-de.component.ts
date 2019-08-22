import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../../firebase.service';

@Component({
    selector: 'app-acerca-de',
    templateUrl: './acerca-de.component.html',
    styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

    constructor(private firebaseService: FirebaseService) {
    }

    topics: Array<any> = [];

    async ngOnInit() {
        await this.firebaseService.getCollection().collection('aboutUs').valueChanges().subscribe(async     res => {
            this.topics = res;
            this.topics = await this.topics.sort((a, b) => {
                if (a.order < b.order) {
                    return 1;
                } else if (a.order > b.order) {
                    return -1;
                } else {
                    return 0;
                }
            });
        }, error => console.log(error), () => {
            console.log('executed');
        });
        console.log(this.topics);
        this.topics = await this.topics.sort((a, b) => {
            if (a.order < b.order) {
                return 1;
            } else if (a.order > b.order) {
                return -1;
            } else {
                return 0;
            }
        });
        console.log('sorted', this.topics);

    }

}
