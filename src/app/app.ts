import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  OrderService,
  OrderRequest,
  OrderResponse
} from './order.service';
import {
  DashboardService,
  DashboardResponse
} from './dashboard.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private orderService = inject(OrderService);
  private dashboardService = inject(DashboardService);

  // Datos del formulario de órdenes (Etapa 10).
  orderId = '';
  description = '';

  // Se usan signals porque Angular 21 no usa zone.js: así la vista se
  // actualiza cuando llega la respuesta HTTP (la guía usa detectChanges()).
  response = signal<OrderResponse | null>(null);
  errorMessage = signal('');

  // Métricas del Dashboard (Etapa 12).
  dashboard = signal<DashboardResponse | null>(null);
  dashboardError = signal('');

  sendOrder(): void {
    this.response.set(null);
    this.errorMessage.set('');

    const order: OrderRequest = {
      orderId: this.orderId,
      description: this.description
    };

    console.log('ENVIANDO ORDEN:', order);

    this.orderService.createOrder(order).subscribe({
      next: (response) => {
        console.log('RESPUESTA RECIBIDA DEL BACKEND:', response);
        this.response.set(response);
      },
      error: (error) => {
        console.error('ERROR HTTP:', error);
        this.errorMessage.set('No fue posible enviar la orden al backend.');
      }
    });
  }

  loadDashboard(): void {
    this.dashboardError.set('');

    console.log('CONSULTANDO DASHBOARD...');

    this.dashboardService.getDashboard().subscribe({
      next: (dashboard) => {
        console.log('RESPUESTA DASHBOARD:', dashboard);
        this.dashboard.set(dashboard);
      },
      error: (error) => {
        console.error('ERROR DASHBOARD:', error);
        this.dashboardError.set('No fue posible obtener las métricas del Dashboard.');
      }
    });
  }
}
