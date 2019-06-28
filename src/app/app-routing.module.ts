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

const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'search/:type/:operation', component: SearchComponent},
    {
        path: 'backend', component: BackendComponent,
        children: [
            {path: 'login', component: LoginComponent},
        ]
    },
    {
        path: 'cms', component: CmsComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'home', component: HomeComponent},
            {path: 'properties', component: PropertiesComponent},
            {path: 'nosotros', component: AboutUsComponent}
        ]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
