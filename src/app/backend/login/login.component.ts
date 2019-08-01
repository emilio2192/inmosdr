import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../firebase.service';
import {Location} from '@angular/common';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private firebase: FirebaseService, private location: Location) {
    }

    username: string;
    password: string;
    loginRequest: any;

    async ngOnInit() {
        console.log('auth ' );
        await this.firebase.getAuth().authState.pipe(first()).toPromise().then(res => {
           console.log(res);
        });
    }

    login = async () => {
        const response = await this.firebase.login(this.username, this.password);
        if (response.code) {
            this.loginRequest = response.message;
        } else {
            // this.router.navigate(['cms/dashboard']);
            window.location.href = `//${window.location.host}/cms/dashboard`;
        }
    };

}
