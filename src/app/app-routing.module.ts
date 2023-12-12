import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './iniciar_sesion/login/login.component';
import { RestorePasswordComponent } from './iniciar_sesion/restore-password/restore-password.component';
import { NavegacionComponent } from './home/navegacion/navegacion.component';
import { AdministracionComponent } from './Administracion/administracion/administracion.component';
import { ClientesComponent } from './Administracion/administracion/clientes/clientes.component';
import { ProductosComponent } from './Administracion/administracion/productos/productos.component';
import { VentasComponent } from './Administracion/administracion/ventas/ventas.component';
import { HomeComponent } from './home/home.component';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { DetalleProductosDialogComponent } from './Administracion/administracion/productos/detalle-productos-dialog/detalle-productos-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: 'profile', component: HomeComponent, canActivate: [MsalGuard]},
  {path: '', component: LoginComponent},
  { path: 'restore-password', component: RestorePasswordComponent },
  { path: 'navegacion', component: NavegacionComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'administracion', component: AdministracionComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'detalle-productos', component: DetalleProductosDialogComponent },
  { path: 'dashboard', component: DashboardComponent}
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
