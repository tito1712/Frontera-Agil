/* data.jsx — iconos de línea + datos simulados compartidos */

const ICONS = {
  shield:   '<path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/>',
  check:    '<path d="M5 12.5l4.2 4.2L19 7"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8.3 12.2l2.6 2.6L16 9.5"/>',
  user:     '<circle cx="12" cy="8" r="3.4"/><path d="M5.5 19.5a6.5 6.5 0 0113 0"/>',
  users:    '<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0111 0"/><path d="M16 5.2a3 3 0 010 5.6"/><path d="M17.5 19a5.5 5.5 0 00-2-4.2"/>',
  car:      '<path d="M3 13l1.8-4.5A2 2 0 016.7 7h10.6a2 2 0 011.9 1.5L21 13v5h-3v-2H6v2H3z"/><circle cx="7.5" cy="15.5" r="1.2"/><circle cx="16.5" cy="15.5" r="1.2"/>',
  qr:       '<rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><path d="M14.5 14.5h2.5v2.5M20.5 14.5v6M14.5 20.5h2.5"/>',
  scan:     '<path d="M4 8V5.5A1.5 1.5 0 015.5 4H8M16 4h2.5A1.5 1.5 0 0120 5.5V8M20 16v2.5a1.5 1.5 0 01-1.5 1.5H16M8 20H5.5A1.5 1.5 0 014 18.5V16"/><path d="M4 12h16"/>',
  file:     '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 13h6M9 16.5h6"/>',
  camera:   '<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.2"/>',
  key:      '<circle cx="8" cy="8" r="3.5"/><path d="M10.5 10.5L20 20M16 16l2-2M14 14l2-2"/>',
  arrowR:   '<path d="M5 12h13M13 6l6 6-6 6"/>',
  arrowL:   '<path d="M19 12H6M11 6l-6 6 6 6"/>',
  help:     '<circle cx="12" cy="12" r="9"/><path d="M9.4 9.5a2.6 2.6 0 015 .9c0 1.7-2.4 2-2.4 3.6"/><circle cx="12" cy="17" r=".6"/>',
  x:        '<path d="M6 6l12 12M18 6L6 18"/>',
  alert:    '<path d="M12 4l9 15.5H3z"/><path d="M12 10v4.5"/><circle cx="12" cy="17.4" r=".6"/>',
  clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
  download: '<path d="M12 4v10M8 11l4 4 4-4"/><path d="M5 19h14"/>',
  pin:      '<path d="M12 21c4-4 6.5-7 6.5-10.2A6.5 6.5 0 005.5 10.8C5.5 14 8 17 12 21z"/><circle cx="12" cy="10.5" r="2.2"/>',
  finger:   '<path d="M8 11a4 4 0 018 0v2.5M8 13.5V16M12 11v4.5M16 13v2a4 4 0 01-.6 2M6 14a8 8 0 01.4-5.5"/>',
  bell:     '<path d="M6 9a6 6 0 1112 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9z"/><path d="M10 18a2 2 0 004 0"/>',
  lock:     '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  plus:     '<path d="M12 5v14M5 12h14"/>',
  building: '<rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h6"/>',
  plane:    '<path d="M21 15l-8-3.5V5.5a1.5 1.5 0 00-3 0v6L2 15v2l8-2v3l-2 1.5V21l3.5-1L15 21v-1.5L13 18v-3l8 2z"/>',
  stamp:    '<path d="M9 4.5a3 3 0 016 0c0 2-1.5 2.5-1.5 4.5h-3C10.5 7 9 6.5 9 4.5z"/><path d="M5 14h14M5 14l1-2.5h12L19 14M4.5 19.5h15"/>',
  refresh:  '<path d="M4 12a8 8 0 0113.5-5.8L20 8M20 4v4h-4"/><path d="M20 12a8 8 0 01-13.5 5.8L4 16M4 20v-4h4"/>',
  logout:   '<path d="M14 5H6.5A1.5 1.5 0 005 6.5v11A1.5 1.5 0 006.5 19H14"/><path d="M17 8l4 4-4 4M21 12H9"/>',
  chevR:    '<path d="M9 6l6 6-6 6"/>',
  eye:      '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  sparkle:  '<path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z"/>',
  doc:      '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4"/>',
  list:     '<path d="M8 7h12M8 12h12M8 17h12"/><circle cx="4.5" cy="7" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="17" r="1"/>',
  flag:     '<path d="M6 21V4M6 5h11l-2 3 2 3H6"/>',
  globe:    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.4 3.8 5.5 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.5-3.8-9S9.5 5.4 12 3z"/>',
  signal:   '<path d="M5 18v-3M9.5 18v-6M14 18v-9M18.5 18V6"/>',
};

function Icon({ name, size = 22, stroke = 1.8, className = '', style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICONS[name] || '' }} />
  );
}

/* ---- datos simulados ---- */
const VIAJERO = {
  nombre: 'Leonard Hernández Soto',
  rut: '18.426.572-K',
  email: 'l.hernandez@correo.cl',
  telefono: '+56 9 7421 8830',
  nacionalidad: 'Chilena',
};

const MENOR = {
  nombre: 'Sofía Hernández Vera',
  rut: '25.103.884-7',
  edad: 9,
  vinculo: 'Hija',
};

const VEHICULO = {
  patente: 'JKLP·42',
  marca: 'Toyota',
  modelo: 'RAV4',
  anio: 2021,
  color: 'Gris plata',
};

const FUNCIONARIO = {
  nombre: 'Santiago Villarroel',
  rol: 'Aduanas',
  codigo: 'ADU-3391',
  caseta: 'Caseta 3',
  paso: 'Complejo Los Libertadores',
};

const PASO = 'Los Libertadores · Chile → Argentina';

Object.assign(window, { Icon, ICONS, VIAJERO, MENOR, VEHICULO, FUNCIONARIO, PASO });
