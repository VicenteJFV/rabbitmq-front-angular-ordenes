# rabbitmq-front-angular

Frontend Angular 21 del **Sistema resiliente de procesamiento de pedidos** (etapas 10 y 12 de la guía).

- **Gestión de Órdenes:** formulario con ID y descripción que hace `POST /api/orders` al backend `rabbitmq-api`.
- **Dashboard RabbitMQ:** botón *Actualizar Dashboard* que consulta `GET /api/dashboard` y muestra
  órdenes procesadas, órdenes con error, reintentos y mensajes en DLQ.

## Ejecutar

Requiere RabbitMQ y el backend `rabbitmq-api` en http://localhost:8081.

```bash
npm install
ng serve
```

Abrir http://localhost:4200.

## Pruebas de la guía

| ID | Descripción | Resultado en el Dashboard |
|---|---|---|
| `DASH-FRONT-001` | Orden correcta enviada desde Angular | Órdenes procesadas +1 |
| `ERROR-DASH-FRONT-001` | ERROR de prueba desde Angular | Con error +1, Reintentos +3, DLQ +1 |

## Nota

La guía usa `ChangeDetectorRef.detectChanges()` para refrescar la vista. Aquí se usan `signal()`,
igual que en las actividades anteriores, porque Angular 21 no usa zone.js.
