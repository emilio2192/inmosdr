import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FirebaseService } from '../../firebase.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private firebase: FirebaseService) { }
  username: string;
  password: string;
  loginRequest: any;
  ngOnInit() {
  }
  login = async () => {
    const response = await this.firebase.login(this.username, this.password);
    if(response.code){
      this.loginRequest = response.message;
    }else{
      this.router.navigate(['cms/dashboard']);
    }    
  }

}
