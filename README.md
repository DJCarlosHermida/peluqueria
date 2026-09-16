# Demo Peluquería

Sitio de reserva de turnos para un salón. El cliente elige el servicio, el día y el horario, y envía la solicitud por WhatsApp.

> Maqueta para mostrar a locales. Marca, zona, horarios y servicios se cambian en `src/data/catalog.ts`.

## Recorrido

| Paso | Ruta | Qué pasa |
| --- | --- | --- |
| Inicio | `/` | Marca, estilo y cómo pedir turno |
| Servicios | `/servicios` | Corte, color, tratamiento, barba, manicura |
| Reservar | `/reservar` | Formulario con día y franja horaria |

Horario de ejemplo: mar–sáb 9:00–19:00 (Montevideo).

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5177](http://localhost:5177).
# peluqueria
