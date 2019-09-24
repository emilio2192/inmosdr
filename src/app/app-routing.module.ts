import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BackendComponent} from './backend/backend.component';
import {LoginComponent} from './backend/login/login.component';
import {CmsComponent} from './backend/cms/cms.component';
import {DashboardComponent} from './backend/cms/dashboard/dashboard.component';
import {HomeComponent} from './backend/cms/home/home.component';
import {PropertiesComponent} from './backend/cms/properties/properties.component';
import {AboutUsComponent} from './backend/cms/about-us/about-us.component';
import {LandingComponent} from './frontend/pages/landing/landing.component';
import {SearchComponent} from './frontend/pages/search/search.component';
import {PropertyComponent} from './frontend/pages/property/property.component';
import {AcercaDeComponent} from './frontend/pages/acerca-de/acerca-de.component';
import {ContactoComponent} from './frontend/pages/contacto/contacto.component';
import {canActivate, loggedIn} from '@angular/fire/auth-guard';
import {AuthGuardGuard} from './guards/auth-guard.guard';

const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'search/:type/:operation', component: SearchComponent},
    {path: 'propiedad/:title/:id', component: PropertyComponent},
    {path: 'quienes-somos', component: AcercaDeComponent},
    {path: 'contacto', component: ContactoComponent},
    {
        path: 'backend', component: BackendComponent,
        children: [
            {path: 'login', component: LoginComponent},
        ]
    },
    {
        path: 'cms', component: CmsComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard]},
            {path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard]},
            {path: 'properties', component: PropertiesComponent, canActivate: [AuthGuardGuard]},
            {path: 'nosotros', component: AboutUsComponent, canActivate: [AuthGuardGuard]}
        ]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
