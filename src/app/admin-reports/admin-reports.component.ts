import { Component, OnInit , ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DepartmentService } from '../services/department.service';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// Registrar los componentes de 'Chart.js'
Chart.register(...registerables);

@Component({
  imports: [CommonModule,FormsModule,BaseChartDirective],
  standalone: true,
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  departments: any[] = [];
  users: any[] = [];
  selectedDepartmentId: number | null = null;
  selectedUserId: number | null = null;
  startDate: string = '';
  endDate: string = '';

 // Definir el tipo de 'reportData' como 'ReportData'
 reportData: ReportData | null = null; 
 showReport: boolean = false;
  isGenerateReportPopupVisible = false;

  //  datos para la grafica
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;  // Para manipular la gráfica
  showChart: boolean = false; 
  activities: any[] = []; // Lista de actividades
  statusCount: { [key: string]: number } = { "Pendiente": 0, "En Progreso": 0, "Completada": 0 }; // Contador de estados
  // Configuración de la gráfica
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: string[] = ['Pendiente', 'En Progreso', 'Completada'];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.barChartLabels,
    datasets: [
      { data: [0, 0, 0], label: 'Actividades' }
    ]
  };
  // Función para cargar actividades al hacer clic en el botón
  generateActivityStatistics(): void {
    this.getActivities();
    this.showChart = true;  // Mostrar la gráfica
  }
  
  // Constructor 
  constructor(private http: HttpClient, private departmentService: DepartmentService, private userService: UserService) {}

  ngOnInit(): void {
    this.getDepartments();  // Cargar los departamentos
    this.getActivities();
  }

  // Método para abrir el popup de generación de reportes
  openGenerateReportPopup(): void {
    this.isGenerateReportPopupVisible = true;
  }

  // Método para cerrar el popup de generación de reportes
  closeGenerateReportPopup(): void {
    this.isGenerateReportPopupVisible = false;
  }

  // Obtener la lista de departamentos
  getDepartments(): void {
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  // Obtener los usuarios cuando se selecciona un departamento
  onDepartmentSelect(): void {
    if (this.selectedDepartmentId) {
      this.userService.getUsersByDepartment(this.selectedDepartmentId).subscribe(users => {
        this.users = users;
      });
    }
  }

   // Método para generar el reporte
  generateReport(): void {
    if (this.selectedUserId && this.startDate && this.endDate) {
      const reportUrl = `http://localhost:8080/user/${this.selectedUserId}/report?startDate=${this.startDate}&endDate=${this.endDate}`;
      this.http.get<ReportData>(reportUrl).subscribe(response => {
        console.log('Reporte generado:', response);
        this.reportData = response;  // Asignar la respuesta a 'reportData'
        this.showReport = true;  // Mostrar el reporte en el HTML
        this.closeGenerateReportPopup();  // Cerrar el popup
      }, error => {
        console.error('Error al generar el reporte:', error);
      });
    } else {
      console.error('Debe seleccionar un usuario y un rango de fechas.');
    }
  }

   // Método para obtener todas las actividades
   getActivities(): void {
    this.http.get<any[]>('http://localhost:8080/activities/list').subscribe(response => {
      this.activities = response;
      this.calculateStatusCounts(); // Calcular el total de cada estado
      this.updateChartData();  // Actualizar los datos de la gráfica
    }, error => {
      console.error('Error al obtener las actividades', error);
    });
  }

  // Método para contar los estados de las actividades
  calculateStatusCounts(): void {
    this.activities.forEach(activity => {
      if (activity.activityStatusName === 'Pendiente') {
        this.statusCount['Pendiente']++;
      } else if (activity.activityStatusName === 'En Progreso') {
        this.statusCount['En Progreso']++;
      } else if (activity.activityStatusName === 'Completada') {
        this.statusCount['Completada']++;
      }
    });
  }

  // Actualizar los datos de la gráfica
  updateChartData(): void {
    this.barChartData.datasets[0].data = [
      this.statusCount['Pendiente'],
      this.statusCount['En Progreso'],
      this.statusCount['Completada']
    ];
    this.chart?.update();  // Actualiza la gráfica cuando cambian los datos
  }

  
}
interface ReportActivity {
  activityName: string;
  timeSpent: number;
}

interface ReportProject {
  projectName: string;
  activities: { [key: string]: ReportActivity };
  totalTimeSpent: number;
}

interface ReportData {
  projectReports: { [key: string]: ReportProject };
}
