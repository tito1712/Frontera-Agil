# Frontera Ágil 🛂

Sistema de modernización del control fronterizo terrestre para el Servicio Nacional de Aduanas de Chile. Proyecto académico desarrollado en el marco de la asignatura de Ingeniería de Software — DUOC UC, Escuela de Informática y Telecomunicaciones.

---

## Descripción

**Frontera Ágil** es un prototipo interactivo que digitaliza y automatiza los trámites aduaneros en pasos fronterizos terrestres, reduciendo los tiempos de espera de hasta 20 horas a minutos. El sistema integra en tiempo real a Aduanas Chile, PDI, SAG, Registro Civil y Aduana Argentina, permitiendo al viajero llegar a la caseta con un único Pase QR validado por el Estado.

---

## Funcionalidades implementadas

| RF | Descripción |
|----|-------------|
| RF-01 | Inicio de sesión con Clave Única |
| RF-02.1 | Validación de identidad mediante QR de cédula |
| RF-02.2 | Consulta de órdenes de arraigo (PDI) |
| RF-02.3 | Validación de tutela y menores de edad |
| RF-03 | Declaración Jurada Digital SAG |
| RF-04 | Registro aduanero de vehículos (RVM) |
| RF-05 | Emisión del Pase QR Unificado |
| RF-06 | Sincronización binacional con Aduana Argentina |
| RF-07 | Notificación automática al viajero por correo |
| RF-08 | Reportes estadísticos automatizados |
| RF-10 | Control físico y autorización en caseta |

---

## Estructura del proyecto

```
Frontera-Agil/
├── Frontera Ágil.html       # Archivo principal (punto de entrada)
├── styles.css               # Sistema de diseño completo
├── data.jsx                 # Datos de prueba y constantes globales
├── app.jsx                  # Raíz de la aplicación, router y estado compartido
├── viajero.jsx              # Landing, login Clave Única, expediente de viaje
├── viajero2.jsx             # Identidad, PDI, menores de edad
├── viajero3.jsx             # Vehículo (RF-04) y Pase QR (RF-05)
├── caseta.jsx               # Login fiscalizador y consola de caseta
├── caseta2.jsx              # Escaneo QR, bitácora y estado de enlaces
├── caseta3.jsx              # Resultado del control (alerta verde/roja) y reportes
└── tweaks-panel.jsx         # Panel de personalización visual (tema, fuente, densidad)
```

---

## Flujo del sistema

```
Viajero                          Caseta (Fiscalizador)
   │                                      │
   ▼                                      ▼
Login Clave Única             Login por organismo (Aduanas / PDI / SAG)
   │                                      │
   ▼                                      ▼
Expediente de viaje           Escaneo del Pase QR
   │                                      │
   ├── Identidad + PDI         Validación en tiempo real
   ├── Menores (Reg. Civil)    (Registro Civil, PDI, SAG, Aduana AR)
   ├── Vehículo (RVM + AR)              │
   └── Declaración SAG        Alerta verde (autorizado) / roja (rechazado)
   │                                      │
   ▼                                      ▼
Pase QR Unificado             Registro en bitácora de auditoría
```

---

## Tecnologías utilizadas

- **React 18** (vía CDN, sin bundler) con Babel standalone
- **JavaScript ES6+** (JSX compilado en el navegador)
- **CSS con tokens personalizados** (oklch, variables CSS, temas intercambiables)
- **HTML5** como punto de entrada único

---

## Cómo ejecutar el prototipo

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tito1712/Frontera-Agil.git
   ```

2. Abre la carpeta en **VS Code**.

3. Abre el archivo `Frontera Ágil.html` con **Live Server** o directamente desde el explorador de archivos.

> ⚠️ No requiere instalación de dependencias ni Node.js. El prototipo corre directamente en el navegador.

---

## Perfiles de usuario

### Viajero
Accede con Clave Única, completa su expediente digital y genera el Pase QR antes de llegar a la frontera.

### Fiscalizador
Accede seleccionando su organismo (Aduanas, PDI o SAG), escanea el Pase QR del viajero y registra la autorización o rechazo del cruce.

---

## Organismos integrados (simulados)

- 🇨🇱 Registro Civil e Identificación
- 🚔 Policía de Investigaciones (PDI)
- 🌿 Servicio Agrícola y Ganadero (SAG)
- 🇦🇷 Dirección General de Aduanas — Argentina

---

## Equipo de desarrollo

| Nombre | Rol |
|--------|-----|
| Leonard Hernández | Project Manager |
| Santiago Villarroel | Desarrollador Backend |
| Julian Naranjo | Desarrollador Frontend |

---

## Metodología

El proyecto fue desarrollado bajo la metodología **Scrum**, con planificación en carta Gantt de 14 semanas dividida en 5 fases: Inicio, Planificación y Diseño, Desarrollo, Pruebas QA y Despliegue.

---

## Institución

**DUOC UC** — Escuela de Informática y Telecomunicaciones  
Asignatura: Ingeniería de Software  
Año: 2026
