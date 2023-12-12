import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CircularChartService } from 'src/app/graficos/circular-chart.service';
import { VerticalBarChartService } from 'src/app/graficos/vertical-bar-chart.service';
import { PieChartService } from 'src/app/graficos/pie-chart.service';
import { NumberCardService } from 'src/app/graficos/number-card.service';
import { MapChartService } from 'src/app/graficos/map-chart.service';
import { NewPieChartService } from 'src/app/graficos/new-pie-chart.service';
import { LegendPosition } from '@swimlane/ngx-charts';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class DashboardComponent implements OnInit {

  view1: any;
  view2: any;
  view3: any;
  view4: any;
  view5: any;
  view6: any;

  colorScheme: any;

  grafico1: any[] = [];
  grafico2: any[] = [];
  grafico3: any[] = [];
  grafico4: any[] = [];
  grafico5: any[] = [];
  grafico6: any[] = [];


  isMobile: boolean = false;
  circularChartVisible: boolean = true;
  barChartVisible: boolean = true;
  pieChartVisible: boolean = true;
  numberChartVisible: boolean = true;
  mapChartVisible: boolean = true;
  newPieChartVisible: boolean = true;



  gradient: boolean = true;
  showLegend:boolean = true;
  showLabels: boolean = true;
  cardColor: string = '#232837';
  showChart: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: LegendPosition = 'below' as LegendPosition;
  animation: boolean = true;


  showXAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  showYAxis : boolean = true;
  xAxisLabel: string = 'Productos';
  yAxisLabel: string = 'Cantidad';
  animations: boolean = true;
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  legendTitle4: string = 'Nombres';
  legendTitle3: string = 'Visitas';

  multi: any[] = [];


  labelFormatting(c: any) {
    return `${(c.label)} Population`;
  }


  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private circularChartService: CircularChartService,
    private pieChartService: PieChartService,
    private verticalBarChartService: VerticalBarChartService,
    private numberCardService: NumberCardService,
    private mapChartService: MapChartService,
    private newPieChartService: NewPieChartService
  ) {}

  ngOnInit(): void { // circular-chart.service.ts
    this.view1 = this.circularChartService.getDefaultCircularChartConfig().view1;
    this.colorScheme = this.circularChartService.getDefaultCircularChartConfig().colorScheme;

    this.circularChartService.getSampleChartData().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.grafico1 = data;
        console.log('Datos para el gráfico circular:', this.grafico1);
      },
      error: (error) => {
        console.error('Error obteniendo los datos:', error);
      }
    });


    // pie-chart.service.ts

    this.view2 = this.pieChartService.getPieChartConfig().view2;
    this.colorScheme = this.pieChartService.getPieChartConfig().colorScheme;

    this.pieChartService.getPieData().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.grafico2 = data;
        console.log('Datos para el gráfico de pie:', this.grafico2);
      },
      error: (error) => {
        console.error('Error obteniendo los datos del gráfico de pie:', error);
      }
    });

     // new-pie-chart.service.ts

     this.view3 = this.newPieChartService.getDefaultNewPieChartConfig().view3;
     this.colorScheme = this.newPieChartService.getDefaultNewPieChartConfig().colorScheme;

     this.newPieChartService.getNewPieChartData().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.grafico3 = data;
        console.log('Datos para el gráfico de new_pie:', this.grafico3);
      },
      error: (error) => {
        console.error('Error obteniendo los datos del gráfico de new_pie:', error);
      }
    });


      // vertical-bar-chart.service.ts



const verticalBarConfig = this.verticalBarChartService.getVerticalBarConfig();

this.view4 = verticalBarConfig.view4;
this.colorScheme = verticalBarConfig.colorScheme;

this.verticalBarChartService.getVerticalBarData().pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    this.grafico4 = data;
    console.log('Datos para el gráfico de barras:', this.grafico4);
  },
  error: (error) => {
    console.error('Error obteniendo los datos:', error);
  }
});







// number-chart.service.ts

    this.view5 = this.numberCardService.getNumberCardConfig().view5;
    this.colorScheme = this.numberCardService.getNumberCardConfig().colorScheme;

    this.numberCardService.getNumberCardData().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.grafico5 = data;
        console.log('Datos para el gráfico numerico:', this.grafico6);
      },
      error: (error) => {
        console.error('Error obteniendo los datos del NumberCard:', error);
      }
    });


    // map-chart.service.ts

    this.view6 = this.mapChartService.getDefaultMapChartConfig().view6;
    this.colorScheme = this.mapChartService.getDefaultMapChartConfig().colorScheme;

    this.mapChartService.getMapData().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.grafico6 = data;  // Asigna los datos a una propiedad diferente, no al servicio
        console.log('Datos para el gráfico de mapas:', this.grafico6);

      },
      error: (error) => {
        console.error('Error obteniendo los datos:', error);
      }
    });







  }

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Total de Visitas', cols: 2, rows: 1, circularChartVisible: true, pieChartVisible: false, newPieChartVisible: false, barChartVisible: false, numberChartVisible: false, mapChartVisible: false },
          { title: 'Visitas Finalizadas', cols: 2, rows: 1, circularChartVisible: false, pieChartVisible: true, newPieChartVisible: false, barChartVisible: false,  numberChartVisible: false, mapChartVisible: false },
          { title: 'Visitas Reprogramadas', cols: 2, rows: 1, circularChartVisible: false, pieChartVisible: false, newPieChartVisible: true,barChartVisible: false, numberChartVisible: false, mapChartVisible: false },
          { title: 'Ventas de Productos', cols: 2, rows: 1, circularChartVisible: false, pieChartVisible: false, newPieChartVisible: false,barChartVisible: true, numberChartVisible: false, mapChartVisible: false },
          { title: 'Conteo de Ventas Ejecutivo', cols: 2, rows: 1, circularChartVisible: false, pieChartVisible: false, newPieChartVisible: false,barChartVisible: false, numberChartVisible:  true, mapChartVisible: false },
          { title: 'Total de visitas de Ejecutivo', cols: 2, rows: 1, circularChartVisible: false, pieChartVisible: false, newPieChartVisible: false,barChartVisible: false, numberChartVisible: false, mapChartVisible: true },

        ];
      }

      return [
        { title: 'Total de Visitas', cols: 2, rows: 1, circularChartVisible: true, pieChartVisible: false, newPieChartVisible: false, barChartVisible: false, numberChartVisible: false, mapChartVisible: false },
        { title: 'Visitas Finalizadas', cols: 2, rows: 1, circularChartVisible: false, pieChartVisible: true, newPieChartVisible: false, barChartVisible: false,  numberChartVisible: false, mapChartVisible: false },
        { title: 'Visitas Reprogramadas', cols: 2, rows: 1, circularChartVisible: false, pieChartVisible: false, newPieChartVisible: true,barChartVisible: false, numberChartVisible: false, mapChartVisible: false },
        { title: 'Ventas de Productos', cols: 2, rows: 1, circularChartVisible: false, pieChartVisible: false, newPieChartVisible: false,barChartVisible: true, numberChartVisible: false, mapChartVisible: false },
        { title: 'Conteo de Ventas Ejecutivo', cols: 2, rows: 1, circularChartVisible: false, pieChartVisible: false, newPieChartVisible: false,barChartVisible: false, numberChartVisible:  true, mapChartVisible: false },
        { title: 'Total de visitas de Ejecutivo', cols: 2, rows: 1, circularChartVisible: false, pieChartVisible: false, newPieChartVisible: false,barChartVisible: false, numberChartVisible: false, mapChartVisible: true },

      ];
    })
  );

  onSelect(event: any): void {
    console.log('Item clicked', event);
  }

  onActivate(event: any): void {
    console.log('Activate', event);
  }

  onDeactivate(event: any): void {
    console.log('Deactivate', event);
  }

  toggleSidenavAndMenu(menuItem: string): void {
    console.log(`Menú seleccionado: ${menuItem}`);


  }
}
