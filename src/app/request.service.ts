import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    constructor(private http: HttpClient) {
    }

    get = (url) => {
        console.log('hostname', window.location.hostname);
        return this.http.get('//' + window.location.hostname + '/' + url);

    }

    post = (url, body) => {
        const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data;');
        return this.http.post('//' + window.location.hostname + '/' + url, body, {});
    }
    otherPost = (url, body) => {
        const headers = new HttpHeaders().set('Content-Type', 'application/json;');
        return this.http.post( url, body, {});
    }
}
