import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../../request.service';

@Component({
    selector: 'app-contacto',
    templateUrl: './contacto.component.html',
    styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
    name: string;
    phone: string;
    comment: string;
    email: string;

    constructor(private request: RequestService) {
    }

    ngOnInit() {
    }

    contact = async () => {
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
        });
    };

}
