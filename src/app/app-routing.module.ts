import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { BrowserUtils } from '@azure/msal-browser';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './iniciar_sesion/login/login.component';
import { ClientesComponent } from './Administracion/administracion/clientes/clientes.component';
import { ProductosComponent } from './Administracion/administracion/productos/productos.component';
import { AdministracionComponent } from './Administracion/administracion/administracion.component';

const routes: Routes = [
  {path: 'profile', component: HomeComponent, canActivate: [MsalGuard]},
  {path: '', component: LoginComponent},
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'administracion', component: AdministracionComponent },
  { path: 'productos', component: ProductosComponent },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //no realizar nav inicial en iframes o ventanas emergentes
      initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
      ? 'enabledNonBlocking' : 'disabled', //establecer enabledNonBlocking para usar angular universal
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
