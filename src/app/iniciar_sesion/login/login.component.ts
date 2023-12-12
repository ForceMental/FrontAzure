
import { MsalService, MsalBroadcastService, MsalGuardConfiguration, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject, filter, takeUntil } from 'rxjs';
import { AccountInfo, InteractionStatus, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, private authService: MsalService, private msalBroadcastService: MsalBroadcastService, private router: Router) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.msalBroadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe(() => {
      this.setLoginDisplay();
    })
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect(
        {...this.msalGuardConfig.authRequest} as RedirectRequest

      );
      this.router.navigate(['/profile']);
    } else {
      this.authService.loginRedirect();
      this.router.navigate(['/profile']);
    }
  }

  logout(){
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }

  setLoginDisplay() {
    const accounts = this.authService.instance.getAllAccounts();
    if (accounts.length > 0) {
      const scopes = ['user.read']; // Define los scopes para los que deseas el token de acceso

      const activeAccount: AccountInfo | null = this.authService.instance.getActiveAccount() || accounts[0];

      if (activeAccount) {
        this.authService.instance.setActiveAccount(activeAccount);

        this.authService.acquireTokenSilent({ scopes, account: activeAccount })
          .subscribe(
            response => {
              // Aquí puedes acceder al token de acceso en response.accessToken
              console.log('Token de acceso:', response.accessToken);
              localStorage.setItem('accessToken', response.accessToken);
            },
            error => {
              // Maneja cualquier error al obtener el token
              console.error('Error al obtener el token de acceso:', error);
            }
          );
      } else {
        console.error('No hay ninguna cuenta activa.');
      }
    } else {
      console.error('No se encontraron cuentas.');
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
