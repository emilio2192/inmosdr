import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {BackendComponent} from './backend/backend.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {LoginComponent} from './backend/login/login.component';
import {CmsComponent} from './backend/cms/cms.component';
import {DashboardComponent} from './backend/cms/dashboard/dashboard.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FirebaseService} from './firebase.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './backend/cms/home/home.component';

import {UploadfyComponent} from './backend/uploadfy/uploadfy.component';
import {HttpClientModule} from '@angular/common/http';
import {RequestService} from './request.service';
import {PropertiesComponent} from './backend/cms/properties/properties.component';
import {AboutUsComponent} from './backend/cms/about-us/about-us.component';
import {HeaderComponent} from './frontend/components/header/header.component';
import {LandingComponent} from './frontend/pages/landing/landing.component';
import {SearchComponent} from './frontend/pages/search/search.component';
import {SearchingComponent} from './frontend/components/searching/searching.component';
import {GridDesktopComponent} from './frontend/components/grid-desktop/grid-desktop.component';
import {PropertyComponent} from './frontend/pages/property/property.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {SlideshowModule} from 'ng-simple-slideshow';
import {AcercaDeComponent} from './frontend/pages/acerca-de/acerca-de.component';
import {ContactoComponent} from './frontend/pages/contacto/contacto.component';

import {AngularFireAuthGuard} from '@angular/fire/auth-guard';



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
        HeaderComponent,
        LandingComponent,
        SearchComponent,
        SearchingComponent,
        GridDesktopComponent,
        PropertyComponent,
        AcercaDeComponent,
        ContactoComponent

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
        HttpClientModule,
        ReactiveFormsModule,
        CarouselModule,
        FontAwesomeModule,
        SlideshowModule,
        FormsModule
    ],
    providers: [FirebaseService, RequestService, AngularFireAuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        library.add(fas);
    }

}
