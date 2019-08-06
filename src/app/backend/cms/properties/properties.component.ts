import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RequestService} from '../../../request.service';
import {Location} from '@angular/common';
import {FirebaseService} from '../../../firebase.service';
import {Property} from '../../../models/property';

@Component({
    selector: 'app-properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
    form: FormGroup;
    newForm: FormGroup;

    // tslint:disable-next-line:max-line-length
    constructor(private request: RequestService, private location: Location, private formBuilder: FormBuilder, private firebaseService: FirebaseService) {
    }

    gallery: Array<string> = [];
    propertyDocumentId = '-1';
    property: Property = {} as Property;
    collection: any;
    ubicacion = 'existente';
    currency = '$';
    properties: Array<any> = [];
    copyPropertyEmpty: Property = {} as Property;
    locations = [];
    files: any;

    async ngOnInit() {
        this.form = this.formBuilder.group({
            item: ['']
        });
        this.newForm = this.formBuilder.group({ item: ['']});
        await this.firebaseService.getProperties().snapshotChanges().subscribe(res => {
            res.map(item => {
                // @ts-ignore
                // tslint:disable-next-line:max-line-length
                this.firebaseService.getCollection().collection('properties').doc('' + item.payload.doc.id).valueChanges().subscribe(response => {
                    // @ts-ignore
                    this.properties.push({id: item.payload.doc.id, data: response});
                    // @ts-ignore
                    if (!this.locations.includes(response.location)) {
                        // @ts-ignore
                        this.locations.push(response.location);
                    }
                });
            });
        });


        this.property.gallery = [];
        this.property.currency = this.currency;
        this.property.isEnable = 'true';
        this.property.promotion = 'false';
        this.copyPropertyEmpty = {...this.property};
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnDestroy() {

    }

    upload = async () => {
        const formData: FormData = new FormData();
        formData.append('item', this.form.get('item').value);
        console.log('formData', formData);
        this.request.post('sdr/upload.php', formData).subscribe((res) => {
            // @ts-ignore
            this.gallery.push(res.name);
            // @ts-ignore
            this.property.gallery.push(res.name);
            console.log('property', this.property);
        });
    };

    handleFileInput(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.form.get('item').setValue(file);
        }
    }

    handleFilesInput(event) {

        for (const element of event.target.files) {
            console.log(element);
            const formData: FormData = new FormData();
            formData.append('item', element);
            console.log('formData', formData);
            this.request.post('sdr/upload.php', formData).subscribe((res) => {
                // @ts-ignore
                this.gallery.push(res.name);
                // @ts-ignore
                this.property.gallery.push(res.name);
                // console.log('property', this.property);
                // console.log(res);
            });
        }
    }

    uploadFiles = () => {
        console.log(this.files);
    }

    save = () => {

        if (this.propertyDocumentId === '-1') {
            console.log(this.firebaseService.getCollection().collection('properties').add(this.property));
            window.location.reload();
        } else {
            console.log('update ', this.property);
            console.log(this.firebaseService.getCollection().collection('properties').doc(this.propertyDocumentId).set(this.property));
            window.location.reload();
        }

    };

    select = () => {
        this.ubicacion = 'existente';
        if (this.propertyDocumentId === '-1') {
            this.property = this.copyPropertyEmpty;
            return;
        }
        const element = this.properties.filter(element => element.id === this.propertyDocumentId);
        this.property = element[0].data;
    };

    deleteImage = (index) => {
        this.property.gallery.splice(index, 1);
    };

}
