import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BackendComponent} from './backend/backend.component';
import {LoginComponent} from './backend/login/login.component';
import {CmsComponent} from './backend/cms/cms.component';
import {DashboardComponent} from './backend/cms/dashboard/dashboard.component';
import {HomeComponent} from './backend/cms/home/home.component';
import {PropertiesComponent} from './backend/cms/properties/properties.component';

const routes: Routes = [
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
            {path: 'properties', component: PropertiesComponent}
        ]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
