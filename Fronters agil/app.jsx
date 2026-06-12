/* app.jsx — Landing, router, estado compartido y Tweaks */

/* ---------- temas (Tweaks) ---------- */
const themeVars = (h, c = 0.11, l = 0.45) => ({
  '--azul': `oklch(${l} ${c} ${h})`,
  '--azul-700': `oklch(${l - 0.07} ${c - 0.01} ${h})`,
  '--azul-900': `oklch(${l - 0.18} ${(c - 0.04).toFixed(3)} ${h + 2})`,
  '--azul-50': `oklch(0.96 0.018 ${h})`,
  '--azul-100': `oklch(0.92 0.035 ${h})`,
  '--sh-azul': `0 8px 26px oklch(${l} ${c} ${h} / 0.28)`,
});
const THEMES = {
  'Azul Aduana': themeVars(256),
  'Teal Pacífico': themeVars(206, 0.10, 0.46),
  'Índigo': themeVars(278, 0.12, 0.46),
  'Granate': themeVars(18, 0.12, 0.47),
};
const FONTS = {
  'Archivo': '"Archivo", system-ui, sans-serif',
  'Space Grotesk': '"Space Grotesk", system-ui, sans-serif',
  'Sora': '"Sora", system-ui, sans-serif',
};

/* ---------- Landing (selección de rol) ---------- */
function Landing({ go }) {
  return (
    <div className="screen-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="wrap row" style={{ height: 76, justifyContent: 'space-between' }}>
        <Brand />
        <div className="row" style={{ gap: 18 }}>
          <span className="row muted" style={{ gap: 7, fontSize: '0.84rem', fontWeight: 600 }}><Icon name="building" size={16} /> Servicio Nacional de Aduanas</span>
          <button className="help-btn"><Icon name="help" size={16} /> Ayuda</button>
        </div>
      </div>

      <div className="wrap" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 0 60px' }}>
        <div style={{ maxWidth: 760, marginBottom: 44 }}>
          <span className="chip" style={{ marginBottom: 18 }}><Icon name="sparkle" size={15} /> Modernización del control fronterizo terrestre</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.7rem)', lineHeight: 1.02, marginBottom: 18 }}>De <span style={{ color: 'var(--rojo)' }}>20 horas</span> de espera<br />a minutos en frontera.</h1>
          <p className="muted" style={{ fontSize: '1.2rem', maxWidth: 600 }}>Frontera Ágil automatiza los trámites aduaneros e integra en tiempo real a Aduanas, PDI, SAG, Registro Civil y la Aduana Argentina.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gap, 20px)', maxWidth: 920 }}>
          <button onClick={() => go('claveunica')} className="card" style={{ textAlign: 'left', padding: 30, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 18, transition: 'transform .15s, box-shadow .15s', boxShadow: 'var(--sh)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-lg)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--sh)'; }}>
            <div style={{ width: 56, height: 56, borderRadius: 15, background: 'var(--azul-50)', color: 'var(--azul)', display: 'grid', placeItems: 'center' }}><Icon name="user" size={28} /></div>
            <div className="stack" style={{ gap: 7 }}>
              <h2 style={{ fontSize: '1.5rem' }}>Soy Viajero</h2>
              <p className="muted">Autogestiona tu identidad, menores, vehículo y declaración. Llega con un único Pase QR.</p>
            </div>
            <span className="row" style={{ gap: 8, color: 'var(--azul)', fontWeight: 700, marginTop: 'auto' }}>Ingresar con Clave Única <Icon name="arrowR" size={18} /></span>
          </button>

          <button onClick={() => go('caseta-login')} className="card" style={{ textAlign: 'left', padding: 30, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 18, transition: 'transform .15s, box-shadow .15s', boxShadow: 'var(--sh)', background: 'linear-gradient(165deg, var(--azul-900), oklch(0.22 0.03 262))', borderColor: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-lg)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--sh)'; }}>
            <div style={{ width: 56, height: 56, borderRadius: 15, background: 'oklch(1 0 0 / 0.14)', color: '#fff', display: 'grid', placeItems: 'center' }}><Icon name="shield" size={28} /></div>
            <div className="stack" style={{ gap: 7 }}>
              <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>Soy Fiscalizador</h2>
              <p style={{ color: 'oklch(1 0 0 / 0.7)' }}>Escanea el Pase QR en la caseta, valida con PDI/SAG y autoriza el cruce con alerta verde o roja.</p>
            </div>
            <span className="row" style={{ gap: 8, color: '#fff', fontWeight: 700, marginTop: 'auto' }}>Abrir consola de caseta <Icon name="arrowR" size={18} /></span>
          </button>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--line)', background: 'var(--surface)' }}>
        <div className="wrap row" style={{ justifyContent: 'space-between', padding: '16px 0', flexWrap: 'wrap', gap: 8 }}>
          <span className="muted" style={{ fontSize: '0.82rem' }}>DUOC UC · Escuela de Informática y Telecomunicaciones — Frontera Ágil</span>
          <span className="muted" style={{ fontSize: '0.82rem' }}>L. Hernández · S. Villarroel · J. Naranjo</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- SAG (RF-03, versión compacta) ---------- */
const SAG_CATS = ['Frutas y verduras frescas', 'Carnes y embutidos', 'Lácteos', 'Semillas y plantas', 'Mascotas / animales', 'Miel y derivados'];
function SagDeclaracion({ go, setExp }) {
  const [sel, setSel] = React.useState({});
  const [done, setDone] = React.useState(false);
  const finish = () => { setExp(e => ({ ...e, sag: true })); go('inicio'); };
  if (done) {
    return (
      <div className="wrap-narrow screen-in" style={{ padding: '34px 0 70px' }}>
        <div className="card card-pad stack" style={{ gap: 20, alignItems: 'center', textAlign: 'center', borderColor: 'oklch(0.85 0.08 150)' }}>
          <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--ok-50)', color: 'var(--ok-700)', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 8px var(--ok-50)' }}><Icon name="checkCircle" size={48} stroke={1.8} /></div>
          <h2 style={{ fontSize: '1.5rem' }}>Declaración SAG emitida</h2>
          <p className="muted" style={{ maxWidth: 420 }}>Tu comprobante se transmitirá en tiempo real a las pantallas del SAG en la caseta. Sin formularios de papel.</p>
          <button className="btn btn-primary btn-lg btn-block" onClick={finish} style={{ maxWidth: 360 }}>Volver al expediente <Icon name="arrowR" size={18} /></button>
        </div>
      </div>
    );
  }
  return (
    <div className="wrap-narrow screen-in" style={{ padding: '34px 0 70px' }}>
      <SectionTitle go={go} back="inicio" kicker="RF-03 · Declaración SAG" title="Declaración Jurada del SAG" desc="Indica qué productos de origen animal o vegetal transportas. Esto permite al SAG perfilar el riesgo antes de tu llegada." />
      <div className="card card-pad stack" style={{ gap: 18 }}>
        <h3 style={{ fontSize: '1.05rem' }}>¿Transportas alguno de estos productos?</h3>
        <div className="stack" style={{ gap: 10 }}>
          {SAG_CATS.map(c => (
            <button key={c} onClick={() => setSel(s => ({ ...s, [c]: !s[c] }))} className="row" style={{ justifyContent: 'space-between', padding: 15, borderRadius: 12, cursor: 'pointer', background: sel[c] ? 'var(--warn-50)' : 'var(--surface)', border: '1.5px solid ' + (sel[c] ? 'oklch(0.85 0.1 80)' : 'var(--line)') }}>
              <span style={{ fontWeight: 600 }}>{c}</span>
              <span className="chip" style={sel[c] ? { background: '#fff', color: 'oklch(0.5 0.12 70)', border: '1px solid oklch(0.85 0.1 80)' } : { background: 'var(--surface-2)', color: 'var(--muted)', border: '1px solid var(--line)' }}>{sel[c] ? 'Sí, lo llevo' : 'No'}</span>
            </button>
          ))}
        </div>
        <button className="btn btn-primary btn-block" onClick={() => setDone(true)}><Icon name="stamp" size={17} /> Firmar y generar comprobante</button>
      </div>
    </div>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "Azul Aduana",
  "font": "Archivo",
  "density": "regular"
}/*EDITMODE-END*/;

const PORTAL = ['inicio', 'identidad', 'menores', 'vehiculo', 'sag', 'pase'];
const CONSOLE = ['caseta-scan', 'caseta-result', 'caseta-reportes'];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = React.useState('landing');
  const [exp, setExp] = React.useState({ identidad: false, menores: false, vehiculo: false, sag: false });
  const [pase, setPase] = React.useState(null);
  const [rol, setRol] = React.useState('Aduanas');
  const [caso, setCaso] = React.useState('ok');
  const [bitacora, setBitacora] = React.useState(BITACORA_SEED);
  const [help, setHelp] = React.useState(false);

  const go = (s) => { setScreen(s); window.scrollTo({ top: 0 }); };
  const addBitacora = (b) => setBitacora(prev => [b, ...prev]);

  const isPortal = PORTAL.includes(screen);
  const isConsole = CONSOLE.includes(screen);

  const rootStyle = { ...THEMES[t.theme], '--font-display': FONTS[t.font] };

  let content;
  switch (screen) {
    case 'landing': content = <Landing go={go} />; break;
    case 'claveunica': content = <ClaveUnica go={go} />; break;
    case 'inicio': content = <Inicio go={go} exp={exp} pase={pase} />; break;
    case 'identidad': content = <Identidad go={go} setExp={setExp} />; break;
    case 'menores': content = <Menores go={go} setExp={setExp} />; break;
    case 'vehiculo': content = <Vehiculo go={go} setExp={setExp} />; break;
    case 'sag': content = <SagDeclaracion go={go} setExp={setExp} />; break;
    case 'pase': content = <Pase go={go} pase={pase} setPase={setPase} exp={exp} />; break;
    case 'caseta-login': content = <CasetaLogin go={go} setRol={setRol} />; break;
    case 'caseta-scan': content = <CasetaScan go={go} rol={rol} setCaso={setCaso} bitacora={bitacora} />; break;
    case 'caseta-result': content = <CasetaResult go={go} caso={caso} rol={rol} addBitacora={addBitacora} />; break;
    case 'caseta-reportes': content = <CasetaReportes go={go} bitacora={bitacora} />; break;
    default: content = <Landing go={go} />;
  }

  return (
    <div className={'app' + (isConsole ? ' console' : '')} data-density={t.density} style={rootStyle}>
      {isPortal && <PortalHeader go={go} onHelp={() => setHelp(true)} />}
      {isConsole && <ConsoleHeader go={go} rol={rol} />}
      {content}
      {help && <HelpModal onClose={() => setHelp(false)} />}

      <TweaksPanel>
        <TweakSection label="Color institucional" />
        <TweakSelect label="Tema" value={t.theme} options={Object.keys(THEMES)} onChange={v => setTweak('theme', v)} />
        <TweakSection label="Tipografía" />
        <TweakRadio label="Títulos" value={t.font} options={Object.keys(FONTS)} onChange={v => setTweak('font', v)} />
        <TweakRadio label="Densidad" value={t.density} options={['compact', 'regular', 'comfy']} onChange={v => setTweak('density', v)} />
      </TweaksPanel>
    </div>
  );
}

function HelpModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'oklch(0.2 0.02 262 / 0.45)', backdropFilter: 'blur(3px)', display: 'grid', placeItems: 'center', zIndex: 80, padding: 20 }}>
      <div onClick={e => e.stopPropagation()} className="card card-pad screen-in" style={{ maxWidth: 460, background: 'var(--surface)' }}>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
          <div className="row" style={{ gap: 10 }}><div style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--azul-50)', color: 'var(--azul)', display: 'grid', placeItems: 'center' }}><Icon name="help" size={22} /></div><h3 style={{ fontSize: '1.2rem' }}>Centro de ayuda</h3></div>
          <button className="btn-quiet" onClick={onClose} style={{ borderRadius: 999, padding: 8 }}><Icon name="x" size={18} /></button>
        </div>
        <p className="muted" style={{ marginBottom: 14 }}>¿Dudas con tu trámite? Estamos para ayudarte en cada paso.</p>
        <div className="stack" style={{ gap: 10 }}>
          {[['doc', 'Guía paso a paso del expediente'], ['user', 'Chatear con un funcionario'], ['bell', 'Estado de mis notificaciones']].map(([ic, txt]) => (
            <div key={txt} className="row" style={{ gap: 12, padding: 13, borderRadius: 11, border: '1px solid var(--line)', cursor: 'pointer' }}>
              <Icon name={ic} size={19} style={{ color: 'var(--azul)' }} /><span style={{ fontWeight: 600, fontSize: '0.92rem' }}>{txt}</span>
              <Icon name="chevR" size={16} style={{ marginLeft: 'auto', color: 'var(--muted)' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
