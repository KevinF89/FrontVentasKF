import { NgModule, InjectionToken }             from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot } from '@angular/router';
import { HomeComponent } from './home/home.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
const deactivateGuard = new InjectionToken('deactivateGuard');

const HOME_ROUTES: Routes = [
    { path: '', component: HomeComponent},
    { path: 'Clientes', loadChildren: () => import('../clientes/clientes.module').then(mod => mod.ClientesModule) },
    { path: 'externalRedirect', canActivate: [externalUrlProvider],component: HomeComponent},
 
];

@NgModule({
    imports: [
      RouterModule.forChild(HOME_ROUTES)
    ],
    exports: [
      RouterModule
    ], providers: [
      {
          provide: externalUrlProvider,
          useValue: (route: ActivatedRouteSnapshot) => {let externalUrl ;
              externalUrl = route.paramMap.get('externalUrl');
              window.open(externalUrl!,'_self');
          },
      },
      {
        provide: deactivateGuard,
        useValue: () => {
          return false;
        }
      },
  ],
  })
  export class HomeRoutingModule {}
