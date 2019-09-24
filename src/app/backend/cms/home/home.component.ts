import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../../firebase.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private firebaseService: FirebaseService) {
    }

    documentId: string;
    content: any;
    documentPath: string;
    collection = 'home';
    contentText: string;

    async ngOnInit() {
        this.firebaseService.getHome().snapshotChanges().subscribe(res => {
            console.log('document ', res);
            this.documentId = res[0].payload.doc.id;
            this.documentPath = this.documentId;
        });
        this.firebaseService.getHome().valueChanges().subscribe(res => {
            this.content = res[0];
            console.log('content', this.content);
            this.contentText = this.content.content;
        });
    }

    guardarContent = () => {
        const data = {...this.content, content: this.contentText};
        console.log('content', data);
        console.log(this.firebaseService.getCollection().collection(this.collection).doc(this.documentId).set(data));
    }

}
