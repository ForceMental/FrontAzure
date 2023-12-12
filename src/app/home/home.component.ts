import { Component, OnInit, ViewChild } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  loginDisplay = false;


  isMenuOpen = false;
  showChart = false; // Agregado para manejar la visibilidad del gráfico

  // Propiedad para controlar la visibilidad de las cards
  showCards = false;

  // Propiedad para controlar la visibilidad de la card del gráfico circular
  showCircularChartCard = false;


  isHandset$: Observable<boolean>;
  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService, private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      })
  }

  setLoginDisplay(){
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  menuOpened(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }


  toggleSidenavAndMenu(menuItem: string): void {
    console.log(`Menú seleccionado: ${menuItem}`);


    if (menuItem === 'Visitas') {
      this.showCircularChartCard = true;
    } else {
      this.showCircularChartCard = false;
    }

    // Lógica para abrir/cerrar el menú
    if (this.isHandset$) {
      this.drawer.toggle();
    }
  }

  handleVisitaClicked(): void {

    console.log('Botón de Visitas clickeado');

    this.showCards = true;
  }

  // Nuevo método para mostrar/ocultar el gráfico
  toggleChartVisibility(): void {
    this.showChart = !this.showChart;

  }

  onChartSelected(event: any): void {
    // Lógica para manejar la selección del gráfico
    console.log('Gráfico seleccionado:', event);
  }
}
