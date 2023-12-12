import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss']
})
export class NavegacionComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  isMenuOpen = false;
  showChart = false; // Agregado para manejar la visibilidad del gráfico

  // Propiedad para controlar la visibilidad de las cards
  showCards = false;

  // Propiedad para controlar la visibilidad de la card del gráfico circular
  showCircularChartCard = false;


  isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
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
