import {Component, OnInit, Input} from '@angular/core';
import {Location} from '@angular/common';
import {RequestService} from '../../request.service';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {FirebaseService} from '../../firebase.service';

@Component({
    selector: 'app-uploadfy',
    templateUrl: './uploadfy.component.html',
    styleUrls: ['./uploadfy.component.css']
})
export class UploadfyComponent implements OnInit {
    @Input() collection: string;
    @Input() documentId: string;
    @Input() attribute: string;
    fileToUpload: File = null;
    form: FormGroup;
    document: any;
    objectDocument: any;

    constructor(private request: RequestService, private location: Location, private formBuilder: FormBuilder, private firebaseService: FirebaseService) {

    }

    ngOnInit() {
        console.log('document', this.collection);
        this.firebaseService.getCollection().collection(this.collection).doc(this.documentId).valueChanges().subscribe(res => {
            console.log('-_-_-', res);
            this.objectDocument = {...res};
        });


        this.form = this.formBuilder.group({
            item: ['']
        });
    }

    upload = async () => {
        const formData: FormData = new FormData();
        formData.append('item', this.form.get('item').value);
        console.log('formData', formData);
        this.request.post('sdr/upload.php', formData).subscribe((res) => {
            // @ts-ignore
            this.update(res.name);
        });
    }

    handleFileInput(event) {
        if (event.target.files.length > 0) {
            console.log('dslkadjas');
            const file = event.target.files[0];
            this.form.get('item').setValue(file);
        }
    }

    update = (path) => {
        const attr = this.attribute;
        this.objectDocument['' + attr] = path;
        const data = {...this.objectDocument};
        console.log('-------', data);
        this.firebaseService.getCollection().collection(this.collection).doc(this.documentId).set(data);
    };

}
