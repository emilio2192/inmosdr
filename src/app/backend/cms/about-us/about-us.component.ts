import {Component, OnInit} from '@angular/core';
import {AboutUs} from '../../../models/aboutUs';
import {FirebaseService} from '../../../firebase.service';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

    expanded = false;
    newTopin: AboutUs = {} as AboutUs;
    topins: Array<any> = [];

    constructor(private firebaseService: FirebaseService) {
    }

    ngOnInit() {
        this.getItems();
    }

    expand = () => {
        this.expanded = !this.expanded;
    }

    crear = () => {
        this.firebaseService.getCollection().collection('aboutUs').add(this.newTopin).then(() => window.location.reload());
    }

    getItems = () => {
        this.firebaseService.getCollection().collection('aboutUs').snapshotChanges().subscribe(res => {
            res.map(item => {
                // tslint:disable-next-line:max-line-length
                this.firebaseService.getCollection().collection('aboutUs').doc('' + item.payload.doc.id).valueChanges().subscribe(response => {
                    this.topins.push({id: item.payload.doc.id, data: response});
                });
            });
        });
    }

    edit = (element) => {
        // tslint:disable-next-line:max-line-length
        this.firebaseService.getCollection().collection('aboutUs').doc('' + element.id).set(element.data).then(() => window.location.reload());
    }

    delete = (id) => {
        this.firebaseService.getCollection().collection('aboutUs').doc('' + id).delete().then(() => window.location.reload());
    }
}
