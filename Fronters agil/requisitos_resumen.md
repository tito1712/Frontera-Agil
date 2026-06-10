# Frontera Ágil — Resumen de requisitos (de la ERS)

Sistema: "Aduana Digital de Alta Velocidad" para el Servicio Nacional de Aduanas (Chile).
Objetivo: reducir esperas fronterizas de 8–20 h a minutos vía automatización e interoperabilidad
(Registro Civil, PDI, SAG, Aduana Argentina).

## Perfiles de usuario
1. **Viajero** — autogestiona trámites antes de llegar a frontera (app móvil intuitiva).
2. **Fiscalizador / Funcionario** (Aduanas / PDI / SAG) — control en caseta, decisiones críticas, reportes.

## Requisitos funcionales (RF)
- RF-01 Inicio de sesión con Clave Única (token estatal seguro).
- RF-02.1 Validación de identidad por QR de cédula (cámara, decodifica reverso).
- RF-02.2 Consulta de órdenes de arraigo (PDI, Apto/No Apto, alerta silenciosa).
- RF-02.3 Validación de tutela y menores (Registro Civil + permiso notarial digital, fallback carga manual).
- RF-03 Declaración Jurada Digital SAG (productos animal/vegetal, firma, riesgo fitosanitario).
- RF-04 Registro Aduanero de Vehículos (patente → RVM, propiedad/robo, Salida y Admisión Temporal).
- RF-05 Emisión de Pase QR Unificado (consolida todos los trámites aprobados, PDF offline).
- RF-06 Sincronización binacional con Aduana Argentina.
- 2FA: escanear código de cédula en caseta → enlace al correo → firma digital del ciudadano.
- Módulo subir autorizaciones de menores (PDF, vinculado a RUT, folio de seguimiento).
- Control de pasajeros: oficial ingresa RUT → cruce PDI → **alerta visual verde/roja**.
- Pase QR de viaje único: escaneado por funcionario despliega todo el expediente del grupo familiar.
- Bitácora/auditoría: qué funcionario aprobó cada etapa + fecha/hora (trazabilidad total).
- Módulo mensajería: correos "Aprobado"/"Rechazado" proactivos.
- Interfaces por rol de funcionario (SAG prioriza alimentos; PDI prioriza menores).
- Reportes descargables en **PDF o Excel** (formato visible).

## Requisitos no funcionales (RNF)
- Rendimiento: miles de transacciones/min; respuesta validaciones **≤ 2 s**.
- Seguridad: AES-256 en reposo, TLS 1.3 en tránsito, 2FA por correo/firma digital.
- Fiabilidad: disponibilidad 99.9%, máx 3 caídas/año, MTBF > 1000 h, recuperación < 5 min.
- Disponibilidad: 24/7, redundancia con servidores de respaldo.
- Mantenibilidad: mantenimiento de madrugada; reportes estadísticos mensuales automáticos.
- Portabilidad: JS/Node/React, Docker; responsive (caseta + móvil).
- Otros: accesibilidad WCAG (contraste, lectores de pantalla); privacidad (consentimiento explícito).

## Interfaz (3.1.1)
- Mantener colores institucionales del Servicio Nacional de Aduanas (azul/rojo, sobrio, gov).
- Botones de ayuda en todo el sistema.
- Login como primer punto de contacto (solo cuentas habilitadas).
- Navegación muy clara e interactiva por diversidad de usuarios.
- Indicar claramente formato de descarga de reportes (PDF/Excel).

## Planificación (contexto)
- 6 meses, equipo de 4 (PM, Frontend, Backend, Ciberseguridad), Scrum.
- Fases: Inicio, Planificación/Diseño, Desarrollo, Pruebas/QA, Despliegue. Total ~$26–31M CLP.

## Flujo general (caso de uso)
Viajero login Clave Única → valida QR cédula → crea expediente (menores, SAG, vehículo) →
sistema cruza con organismos externos → genera QR único → en caseta funcionario escanea →
consulta restricciones → sincroniza con Aduana Argentina → registra auditoría → autoriza cruce.
