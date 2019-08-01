import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {FirebaseService} from '../firebase.service';
import {first} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
    constructor(private firebaseService: FirebaseService, private route: Router) {
    }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> {
        try {
            await this.firebaseService.getAuth().authState.pipe(first()).toPromise().then(res => {
                console.log(res);
            });
            const isLoggedIn = await this.firebaseService.getAuth().authState.pipe(first()).toPromise();
            console.log(isLoggedIn);
            if (!isLoggedIn) {
                this.route.navigateByUrl('backend/login');
                return Promise.resolve(false);
            } else {
                return Promise.resolve(true);
            }
        } catch (e) {
            return Promise.reject(e);
        }


    }

}
