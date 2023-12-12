import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MsalModule, MsalGuardConfiguration, MsalInterceptorConfiguration, MsalRedirectComponent, MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './iniciar_sesion/login/login.component';
import { ClientesComponent } from './Administracion/administracion/clientes/clientes.component';
import { AdministracionComponent } from './Administracion/administracion/administracion.component';
import { ProductosComponent } from './Administracion/administracion/productos/productos.component';
import { ClienteEditDialogComponent } from './Administracion/administracion/clientes/cliente-edit-dialog/cliente-edit-dialog.component';
import { ProductoEditDialogComponent } from './Administracion/administracion/productos/producto-edit-dialog/producto-edit-dialog.component';
import { ConfirmDialogComponent } from './Administracion/administracion/clientes/confirm-dialog/confirm-dialog.component';
import { NuevoClienteDialogComponent } from './Administracion/administracion/clientes/nuevo-cliente-dialog/nuevo-cliente-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
const isIE: boolean = window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;
const MsalInterceptorConfig = {} as MsalInterceptorConfiguration;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    AdministracionComponent,
    ClientesComponent,
    ProductosComponent,
    ClienteEditDialogComponent,
    ProductoEditDialogComponent,
    ConfirmDialogComponent,
    NuevoClienteDialogComponent,
    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule,
    NgxChartsModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: '10c0a520-d47e-45bb-a7ab-fb2bbf129cf3', // Reemplaza con el ID de cliente de tu aplicación registrada en Azure AD
          authority: 'https://login.microsoftonline.com/42d9664f-6210-436c-a21e-5fef2f89b719', // Reemplaza con el ID de inquilino de tu Azure AD
          redirectUri: 'http://localhost:4200/profile', // URL a la que Azure AD redirecciona después del inicio de sesión
        },
        cache: {
          cacheLocation: 'sessionStorage',
          storeAuthStateInCookie: isIE
        }
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ["https://graph.microsoft.com/v1.0/me", ["user.read"]],
        ])
      }
    )
  ],
  providers: [
    MsalGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
