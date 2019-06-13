import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { BackendComponent } from './backend/backend.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { LoginComponent } from './backend/login/login.component';
import { CmsComponent } from './backend/cms/cms.component';
import { DashboardComponent } from './backend/cms/dashboard/dashboard.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseService } from './firebase.service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './backend/cms/home/home.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { UploadfyComponent } from './backend/uploadfy/uploadfy.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestService } from './request.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PropertiesComponent } from './backend/cms/properties/properties.component';
import { AboutUsComponent } from './backend/cms/about-us/about-us.component';


@NgModule({
  declarations: [
    AppComponent,
    BackendComponent,
    LoginComponent,
    CmsComponent,
    DashboardComponent,
    HomeComponent,
    UploadfyComponent,
    PropertiesComponent,
    AboutUsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    MatFileUploadModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [FirebaseService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
