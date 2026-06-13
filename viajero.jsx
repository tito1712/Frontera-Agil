/* viajero.jsx — Portal del Viajero (autogestión de trámites) */

/* ---------- QR estilizado (matriz determinista de cuadrados) ---------- */
function QRCode({ seed = 'FA', size = 200, fg = '#11243f' }) {
  const N = 25;
  // PRNG determinista desde el seed
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  const rnd = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 1000) / 1000; };
  const cell = size / N;
  const rects = [];
  const isFinder = (r, c) => (
    (r < 8 && c < 8) || (r < 8 && c >= N - 8) || (r >= N - 8 && c < 8)
  );
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    if (isFinder(r, c)) continue;
    if (rnd() > 0.52) rects.push(<rect key={r + '-' + c} x={c * cell} y={r * cell} width={cell * 1.02} height={cell * 1.02} rx={cell * 0.18} fill={fg} />);
  }
  const Finder = ({ x, y }) => (
    <g transform={`translate(${x * cell} ${y * cell})`}>
      <rect width={cell * 7} height={cell * 7} rx={cell * 1.6} fill={fg} />
      <rect x={cell} y={cell} width={cell * 5} height={cell * 5} rx={cell * 1.1} fill="#fff" />
      <rect x={cell * 2} y={cell * 2} width={cell * 3} height={cell * 3} rx={cell * 0.8} fill={fg} />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <rect width={size} height={size} fill="#fff" />
      {rects}
      <Finder x={0} y={0} /><Finder x={N - 7} y={0} /><Finder x={0} y={N - 7} />
    </svg>
  );
}

/* ---------- shell del portal ---------- */
function PortalHeader({ go, onHelp, onLogout }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'oklch(1 0 0 / 0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)' }}>
      <div className="wrap row" style={{ height: 68, justifyContent: 'space-between' }}>
        <button className="row" onClick={() => go('inicio')} style={{ gap: 12, background: 'none', border: 0, padding: 0 }}>
          <Brand />
        </button>
        <div className="row" style={{ gap: 10 }}>
          <button className="help-btn" onClick={onHelp}><Icon name="help" size={16} /> Ayuda</button>
          <div className="row" style={{ gap: 9, padding: '6px 6px 6px 14px', border: '1px solid var(--line)', borderRadius: 999, boxShadow: 'var(--sh-sm)', background: 'var(--surface)' }}>
            <div className="stack" style={{ alignItems: 'flex-end', lineHeight: 1.15 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{VIAJERO.nombre.split(' ').slice(0, 2).join(' ')}</span>
              <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>{VIAJERO.rut}</span>
            </div>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--azul)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontFamily: 'var(--font-display)' }}>LH</div>
          </div>
          <button className="btn-quiet row" onClick={onLogout} title="Salir" style={{ borderRadius: 999, padding: 9 }}><Icon name="logout" size={18} /></button>
        </div>
      </div>
    </header>
  );
}

function Brand({ light = false }) {
  const col = light ? '#fff' : 'var(--azul)';
  return (
    <div className="row" style={{ gap: 11 }}>
      <div style={{ width: 38, height: 38, borderRadius: 11, background: light ? 'oklch(1 0 0 / 0.14)' : 'var(--azul)', display: 'grid', placeItems: 'center', boxShadow: light ? 'none' : 'var(--sh-azul)' }}>
        <Icon name="shield" size={22} stroke={2} style={{ color: '#fff' }} />
      </div>
      <div className="stack" style={{ lineHeight: 1.0, alignItems: 'flex-start' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.12rem', letterSpacing: '-0.02em', color: light ? '#fff' : 'var(--ink)', whiteSpace: 'nowrap' }}>Frontera Ágil</span>
        <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: light ? 'oklch(1 0 0 / 0.7)' : 'var(--muted)', whiteSpace: 'nowrap' }}>Aduana Digital</span>
      </div>
    </div>
  );
}

function SectionTitle({ kicker, title, desc, back, go }) {
  return (
    <div className="stack" style={{ gap: 12, marginBottom: 26 }}>
      {back && <button className="btn-quiet row" onClick={() => go(back)} style={{ alignSelf: 'flex-start', borderRadius: 999, paddingLeft: 12, gap: 6, color: 'var(--azul)' }}><Icon name="arrowL" size={17} /> Volver al expediente</button>}
      {kicker && <span className="chip" style={{ alignSelf: 'flex-start' }}>{kicker}</span>}
      <h1 style={{ fontSize: '2rem' }}>{title}</h1>
      {desc && <p className="muted" style={{ maxWidth: 620, fontSize: '1.04rem' }}>{desc}</p>}
    </div>
  );
}

/* ============================================================
   1 · Clave Única (RF-01)
   ============================================================ */
function DocTypeToggle({ value, onChange }) {
  return (
    <div className="row" style={{ gap: 0, border: '1.5px solid var(--line)', borderRadius: 10, overflow: 'hidden' }}>
      {[['rut', 'RUT · Chile'], ['dni', 'Inicio de sesión extranjero']].map(([v, lbl]) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          style={{ flex: 1, padding: '9px 0', fontWeight: 700, fontSize: '0.85rem', border: 0,
            background: value === v ? 'var(--azul)' : 'transparent',
            color: value === v ? '#fff' : 'var(--muted)',
            borderLeft: v === 'dni' ? '1.5px solid var(--line)' : 0 }}>
          {lbl}
        </button>
      ))}
    </div>
  );
}

function ClaveUnica({ go }) {
  const [docType, setDocType] = React.useState('rut');
  const [doc, setDoc] = React.useState(VIAJERO.rut);
  const [pass, setPass] = React.useState('••••••••••');
  const [emailExt, setEmailExt] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleDocType = (type) => {
    setDocType(type);
    setDoc(type === 'rut' ? VIAJERO.rut : '');
  };

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => go('inicio'), 1100);
  };
  return (
    <div className="screen-in" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1.05fr 1fr' }}>
      {/* panel marca */}
      <div style={{ background: 'linear-gradient(155deg, var(--azul-700), var(--azul-900))', color: '#fff', padding: '54px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(oklch(1 0 0 / 0.07) 1px, transparent 1px)', backgroundSize: '22px 22px', opacity: 0.6 }} />
        <div style={{ position: 'relative' }}><Brand light /></div>
        <div className="stack" style={{ gap: 22, position: 'relative', maxWidth: 460 }}>
          <h1 style={{ color: '#fff', fontSize: '2.6rem', lineHeight: 1.04 }}>Cruza la frontera en minutos, no en horas.</h1>
          <p style={{ color: 'oklch(1 0 0 / 0.82)', fontSize: '1.1rem' }}>Realiza todos tus trámites aduaneros desde casa y llega a la frontera con un único Pase QR validado por el Estado.</p>
          <div className="row" style={{ gap: 22, marginTop: 6, flexWrap: 'wrap' }}>
            {[['lock', 'Datos cifrados AES-256'], ['signal', 'Validación en < 2 s'], ['globe', 'Integrado Chile–Argentina']].map(([ic, t]) => (
              <div key={t} className="row" style={{ gap: 9, color: 'oklch(1 0 0 / 0.92)', fontSize: '0.9rem', fontWeight: 600 }}><Icon name={ic} size={18} /> {t}</div>
            ))}
          </div>
        </div>
        <div className="row" style={{ gap: 8, position: 'relative', color: 'oklch(1 0 0 / 0.6)', fontSize: '0.8rem' }}>
          <Icon name="building" size={16} /> Servicio Nacional de Aduanas · Gobierno de Chile
        </div>
      </div>
      {/* panel login */}
      <div style={{ display: 'grid', placeItems: 'center', padding: 40 }}>
        <form onSubmit={submit} className="stack" style={{ width: 'min(420px, 100%)', gap: 22 }}>
          <div className="stack" style={{ gap: 8 }}>
            {docType === 'rut'
              ? <div className="chip chip-neutral" style={{ alignSelf: 'flex-start' }}><Icon name="key" size={15} /> Acceso seguro del Estado</div>
              : <div className="chip chip-neutral" style={{ alignSelf: 'flex-start' }}><Icon name="globe" size={15} /> Portal Migraciones Chile</div>
            }
            <h2 style={{ fontSize: '1.7rem' }}>
              {docType === 'rut' ? 'Inicia sesión con tu Clave Única' : 'Inicio de sesión extranjero'}
            </h2>
            <p className="muted">Solo usuarios con cuenta habilitada pueden ingresar. No almacenamos tu contraseña.</p>
          </div>
          <div className="field">
            <label>Tipo de documento</label>
            <DocTypeToggle value={docType} onChange={handleDocType} />
          </div>
          {docType === 'rut' ? (
            <div className="field">
              <label>RUT</label>
              <input className="input mono" value={doc}
                placeholder="12.345.678-9"
                onChange={e => setDoc(formatRUT(e.target.value))}
                maxLength={12} />
            </div>
          ) : (
            <div className="field">
              <label>Correo electrónico</label>
              <input className="input" type="email" value={emailExt} placeholder="correo@ejemplo.com"
                onChange={e => setEmailExt(e.target.value)} />
            </div>
          )}
          <div className="field">
            <label>{docType === 'rut' ? 'Clave Única' : 'Contraseña'}</label>
            <div style={{ position: 'relative' }}>
              <input className="input" type="password" value={pass} onChange={e => setPass(e.target.value)} style={{ paddingRight: 44 }} />
              <Icon name="eye" size={18} style={{ position: 'absolute', right: 14, top: 14, color: 'var(--muted)' }} />
            </div>
          </div>
          <button className="btn btn-primary btn-lg btn-block" disabled={loading}>
            {loading ? <><Icon name="refresh" size={18} className="spin" /> Validando token…</> : <>Continuar <Icon name="arrowR" size={18} /></>}
          </button>
          {docType === 'dni' && (
            <div style={{ textAlign: 'center' }}>
              <span className="muted" style={{ fontSize: '0.86rem' }}>¿No tenés cuenta? </span>
              <button type="button" className="btn-quiet" style={{ fontSize: '0.86rem', color: 'var(--azul)', fontWeight: 700 }} onClick={() => go('crear-cuenta')}>Crear cuenta</button>
            </div>
          )}
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <button type="button" className="btn-quiet" style={{ fontSize: '0.86rem', color: 'var(--azul)' }} onClick={() => go('olvide-clave')}>¿Olvidaste tu clave?</button>
            <span className="row muted" style={{ gap: 6, fontSize: '0.78rem' }}><Icon name="lock" size={14} /> Conexión TLS 1.3</span>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============================================================
   2 · Inicio / Expediente de viaje (dashboard)
   ============================================================ */
const TRAMITES = [
  { key: 'identidad', icon: 'finger', titulo: 'Validación de identidad', desc: 'Escanea el QR de tu cédula y verifica antecedentes (PDI).', rf: 'RF-02', req: true, etiqueta: null },
  { key: 'menores', icon: 'users', titulo: 'Viajo con menores de edad', desc: 'Autorización notarial y vínculo legal (Registro Civil).', rf: 'RF-02.3', req: false, etiqueta: 'Si llevas niños o jóvenes menores de 18 años' },
  { key: 'vehiculo', icon: 'car', titulo: 'Llevo vehículo particular', desc: 'Salida y Admisión Temporal validada con el RVM y Aduana Argentina.', rf: 'RF-04', req: false, etiqueta: 'Si cruzas en auto, camioneta u otro motorizado' },
  { key: 'sag', icon: 'flag', titulo: 'Declaración SAG', desc: 'Productos de origen animal o vegetal que transportas.', rf: 'RF-03', req: false, etiqueta: 'Si portas alimentos, plantas, mascotas o subproductos' },
];

function Inicio({ go, exp, pase }) {
  const identidadDone = exp['identidad'];
  const optDone = TRAMITES.filter(t => !t.req && exp[t.key]).length;

  const TramiteCard = ({ t }) => {
    const done = exp[t.key];
    return (
      <button onClick={() => go(t.key)} className="card" style={{ textAlign: 'left', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 18, alignItems: 'center', padding: 20, cursor: 'pointer', borderColor: done ? 'oklch(0.85 0.08 150)' : 'var(--line)', width: '100%' }}>
        <div style={{ width: 48, height: 48, borderRadius: 13, display: 'grid', placeItems: 'center', background: done ? 'var(--ok-50)' : 'var(--azul-50)', color: done ? 'var(--ok-700)' : 'var(--azul)' }}>
          <Icon name={done ? 'check' : t.icon} size={24} stroke={done ? 2.4 : 1.8} />
        </div>
        <div className="stack" style={{ gap: 4 }}>
          <div className="row" style={{ gap: 9, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem' }}>{t.titulo}</span>
            <span className="mono" style={{ fontSize: '0.66rem', color: 'var(--muted)', border: '1px solid var(--line)', borderRadius: 5, padding: '1px 5px' }}>{t.rf}</span>
          </div>
          {t.etiqueta
            ? <span className="muted" style={{ fontSize: '0.84rem', fontStyle: 'italic' }}>{t.etiqueta}</span>
            : <span className="muted" style={{ fontSize: '0.92rem' }}>{t.desc}</span>}
        </div>
        <div className="row" style={{ gap: 12 }}>
          {done
            ? <span className="chip chip-ok"><Icon name="check" size={14} /> Agregado</span>
            : <span className="chip chip-neutral" style={{ padding: '5px 11px' }}><Icon name="plus" size={13} /> Agregar</span>}
          <Icon name="chevR" size={20} style={{ color: 'var(--muted)' }} />
        </div>
      </button>
    );
  };

  return (
    <div className="wrap screen-in" style={{ padding: '36px 0 70px' }}>
      {/* hero */}
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 18, marginBottom: 28 }}>
        <div className="stack" style={{ gap: 8 }}>
          <span className="chip" style={{ alignSelf: 'flex-start' }}><Icon name="sparkle" size={15} /> Expediente de viaje activo</span>
          <h1 style={{ fontSize: '2.3rem' }}>Hola, Leonard</h1>
          <p className="muted" style={{ fontSize: '1.06rem' }}>Verifica tu identidad para cruzar. Agrega los documentos que aplican a tu situación.</p>
        </div>
        <div className="card card-pad" style={{ minWidth: 250, padding: 20 }}>
          <div className="row muted" style={{ gap: 7, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}><Icon name="pin" size={15} /> Cruce programado</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.12rem', marginTop: 8 }}>{PASO}</div>
          <div className="row" style={{ gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
            <div><div className="muted" style={{ fontSize: '0.72rem' }}>Fecha</div><div style={{ fontWeight: 700 }}>14 ene 2026</div></div>
            <div><div className="muted" style={{ fontSize: '0.72rem' }}>Grupo</div><div style={{ fontWeight: 700 }}>2 personas</div></div>
            <div><div className="muted" style={{ fontSize: '0.72rem' }}>Modalidad</div><div style={{ fontWeight: 700 }}>Vehículo</div></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 'var(--gap, 20px)', alignItems: 'start' }}>
        {/* trámites */}
        <div className="stack" style={{ gap: 'var(--gap, 20px)' }}>

          {/* --- OBLIGATORIO --- */}
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.1rem' }}>Obligatorio para todos</h2>
            {identidadDone
              ? <span className="chip chip-ok" style={{ fontSize: '0.78rem' }}><Icon name="check" size={13} /> Identidad verificada</span>
              : <span className="chip chip-warn" style={{ fontSize: '0.78rem' }}><span className="dot" /> Pendiente</span>}
          </div>
          <TramiteCard t={TRAMITES[0]} />

          {/* --- SEGÚN TU SITUACIÓN --- */}
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <h2 style={{ fontSize: '1.1rem' }}>Agrega según tu situación</h2>
            <span className="muted" style={{ fontSize: '0.84rem', fontWeight: 600 }}>{optDone} agregado{optDone !== 1 ? 's' : ''}</span>
          </div>
          <div className="stack" style={{ gap: 10, padding: 14, background: 'var(--surface-2)', borderRadius: 'var(--r-lg)', border: '1px solid var(--line)' }}>
            <p className="muted" style={{ fontSize: '0.84rem', paddingInline: 4 }}>Cada proceso es independiente. Solo incluye los que correspondan a tu viaje — no todos son necesarios.</p>
            {TRAMITES.slice(1).map(t => <TramiteCard key={t.key} t={t} />)}
          </div>
        </div>

        {/* rail derecho */}
        <div className="stack" style={{ gap: 'var(--gap, 20px)', position: 'sticky', top: 88 }}>
          <div className="card card-pad" style={{ background: identidadDone ? 'linear-gradient(160deg, var(--azul-700), var(--azul-900))' : 'var(--surface)', color: identidadDone ? '#fff' : 'var(--ink)', borderColor: identidadDone ? 'transparent' : 'var(--line)' }}>
            <div className="row" style={{ gap: 9, marginBottom: 10 }}>
              <Icon name="qr" size={22} style={{ color: identidadDone ? '#fff' : 'var(--azul)' }} />
              <h3 style={{ fontSize: '1.1rem', color: identidadDone ? '#fff' : 'var(--ink)' }}>Pase QR de cruce</h3>
            </div>
            <p style={{ fontSize: '0.92rem', color: identidadDone ? 'oklch(1 0 0 / 0.85)' : 'var(--muted)', marginBottom: 16 }}>
              {identidadDone
                ? 'Tu identidad está verificada. Genera el Pase QR — incluirá automáticamente los documentos que hayas agregado.'
                : 'Verifica tu identidad para habilitar el Pase de cruce. El resto de los procesos son opcionales según tu situación.'}
            </p>
            <button className={'btn btn-block ' + (identidadDone ? 'btn-ghost' : 'btn-primary')} disabled={!identidadDone} onClick={() => go('pase')} style={identidadDone ? { background: '#fff', color: 'var(--azul-900)' } : {}}>
              {pase ? 'Ver mi Pase QR' : 'Generar Pase QR'} <Icon name="arrowR" size={18} />
            </button>
          </div>
          <div className="card card-pad">
            <div className="row" style={{ gap: 8, marginBottom: 12 }}><Icon name="signal" size={18} style={{ color: 'var(--azul)' }} /><h3 style={{ fontSize: '1rem' }}>Organismos conectados</h3></div>
            <div className="stack" style={{ gap: 11 }}>
              {[['Registro Civil', 'Identidad'], ['PDI', 'Migración'], ['SAG', 'Fitosanitario'], ['Aduana Argentina', 'Vehículos']].map(([n, d]) => (
                <div key={n} className="row" style={{ justifyContent: 'space-between' }}>
                  <div className="row" style={{ gap: 9 }}><span className="dot" style={{ color: 'var(--ok)' }} /><span style={{ fontWeight: 600, fontSize: '0.92rem' }}>{n}</span></div>
                  <span className="muted" style={{ fontSize: '0.78rem' }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Olvidé mi Clave Única
   ============================================================ */
function OlvideClave({ go }) {
  const [email, setEmail] = React.useState(VIAJERO.email);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null); // null | 'ok' | 'notfound'

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(email.toLowerCase() === VIAJERO.email.toLowerCase() ? 'ok' : 'notfound');
    }, 1600);
  };

  if (result === 'ok') {
    return (
      <div className="screen-in" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
        <div className="card card-pad stack" style={{ maxWidth: 440, width: '100%', gap: 22, alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--ok-50)', color: 'var(--ok-700)', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 10px var(--ok-50)' }}>
            <Icon name="checkCircle" size={46} stroke={1.6} />
          </div>
          <div className="stack" style={{ gap: 8 }}>
            <h2 style={{ fontSize: '1.55rem' }}>Correo enviado</h2>
            <p className="muted">Enviamos las instrucciones para restablecer tu Clave Única a <strong style={{ color: 'var(--ink)' }}>{email}</strong>. Revisa tu bandeja de entrada y la carpeta de spam.</p>
          </div>
          <div className="stack" style={{ gap: 10, width: '100%' }}>
            <button className="btn btn-primary btn-lg btn-block" onClick={() => go('claveunica')}>
              Volver al inicio de sesión <Icon name="arrowR" size={18} />
            </button>
            <button type="button" className="btn-quiet" style={{ color: 'var(--muted)', fontSize: '0.86rem' }} onClick={() => { setResult(null); setLoading(false); }}>
              ¿No llegó el correo? Reenviar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <div style={{ width: 'min(440px, 100%)' }}>
        <button type="button" className="btn-quiet row" onClick={() => go('claveunica')} style={{ borderRadius: 999, gap: 6, color: 'var(--azul)', marginBottom: 28 }}>
          <Icon name="arrowL" size={17} /> Volver al inicio de sesión
        </button>
        <div className="card card-pad stack" style={{ gap: 24 }}>
          <div className="stack" style={{ gap: 8 }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: 'var(--azul-50)', color: 'var(--azul)', display: 'grid', placeItems: 'center', marginBottom: 4 }}>
              <Icon name="key" size={26} />
            </div>
            <h2 style={{ fontSize: '1.6rem' }}>Recuperar Clave Única</h2>
            <p className="muted">Ingresa el correo electrónico asociado a tu cuenta. Te enviaremos un enlace para crear una nueva contraseña.</p>
          </div>
          <form onSubmit={submit} className="stack" style={{ gap: 18 }}>
            <div className="field">
              <label>Correo electrónico</label>
              <input
                className="input"
                type="email"
                placeholder="tucorreo@ejemplo.cl"
                value={email}
                onChange={e => { setEmail(e.target.value); setResult(null); }}
              />
            </div>
            {result === 'notfound' && (
              <div className="row screen-in" style={{ gap: 10, padding: '12px 14px', borderRadius: 10, background: 'var(--warn-50)', border: '1px solid oklch(0.85 0.1 80)' }}>
                <Icon name="alert" size={17} style={{ color: 'oklch(0.5 0.12 70)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'oklch(0.45 0.06 70)', fontWeight: 600 }}>No encontramos ninguna cuenta asociada a ese correo.</span>
              </div>
            )}
            <button className="btn btn-primary btn-lg btn-block" disabled={loading || !email}>
              {loading
                ? <><Icon name="refresh" size={18} className="spin" /> Enviando instrucciones…</>
                : <>Enviar instrucciones <Icon name="arrowR" size={18} /></>}
            </button>
          </form>
          <p className="muted" style={{ fontSize: '0.8rem', textAlign: 'center' }}>
            ¿Recuerdas tu contraseña?{' '}
            <button type="button" className="btn-quiet" style={{ color: 'var(--azul)', fontWeight: 700, fontSize: '0.8rem', display: 'inline' }} onClick={() => go('claveunica')}>
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Crear cuenta (DNI extranjero) — Migraciones Chile
   ============================================================ */
const PAISES_NACIMIENTO = ['Argentina','Bolivia','Brasil','Chile','Colombia','Ecuador','España','Estados Unidos','Francia','Italia','México','Paraguay','Perú','Portugal','Uruguay','Venezuela','Otro'];

function CrearCuenta({ go }) {
  const [form, setForm] = React.useState({ nombre: '', apellido1: '', apellido2: '', fechaNac: '', pais: '', sexo: '', email: '', emailConf: '', pass: '', passConf: '' });
  const [captcha, setCaptcha] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (form.email !== form.emailConf) { setError('Los correos no coinciden.'); return; }
    if (form.pass !== form.passConf) { setError('Las contraseñas no coinciden.'); return; }
    if (!captcha) { setError('Confirma que no eres un robot.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1400);
  };

  if (done) {
    return (
      <div className="screen-in" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
        <div className="card card-pad stack" style={{ maxWidth: 480, width: '100%', gap: 22, alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--ok-50)', color: 'var(--ok-700)', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 10px var(--ok-50)' }}>
            <Icon name="checkCircle" size={46} stroke={1.6} />
          </div>
          <div className="stack" style={{ gap: 8 }}>
            <h2 style={{ fontSize: '1.55rem' }}>Cuenta creada</h2>
            <p className="muted">Tu cuenta fue registrada con <strong style={{ color: 'var(--ink)' }}>{form.email}</strong>. Ya podés iniciar sesión.</p>
          </div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => go('claveunica')}>
            Iniciar sesión <Icon name="arrowR" size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px 60px' }}>
      <div style={{ width: 'min(540px, 100%)' }}>
        <button type="button" className="btn-quiet row" onClick={() => go('claveunica')} style={{ borderRadius: 999, gap: 6, color: 'var(--azul)', marginBottom: 28 }}>
          <Icon name="arrowL" size={17} /> Volver al inicio de sesión
        </button>

        <div className="stack" style={{ gap: 6, alignItems: 'center', textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--azul-50)', color: 'var(--azul)', display: 'grid', placeItems: 'center', marginBottom: 6 }}>
            <Icon name="globe" size={28} />
          </div>
          <h2 style={{ fontSize: '1.75rem' }}>Migraciones Chile</h2>
          <p className="muted" style={{ fontSize: '0.9rem' }}>Registra tus datos para crear una cuenta de acceso al portal de extranjeros.</p>
        </div>

        <div className="card card-pad">
          <form onSubmit={submit} className="stack" style={{ gap: 16 }}>
            <div className="field">
              <label>Nombre <span style={{ color: 'var(--rojo)' }}>(*)</span></label>
              <input className="input" value={form.nombre} placeholder="Tu nombre" onChange={e => set('nombre', e.target.value)} required />
            </div>
            <div className="field">
              <label>Primer apellido <span style={{ color: 'var(--rojo)' }}>(*)</span></label>
              <input className="input" value={form.apellido1} placeholder="Primer apellido" onChange={e => set('apellido1', e.target.value)} required />
            </div>
            <div className="field">
              <label>Segundo apellido</label>
              <input className="input" value={form.apellido2} placeholder="Segundo apellido (opcional)" onChange={e => set('apellido2', e.target.value)} />
            </div>
            <div className="field">
              <label>Fecha de nacimiento <span style={{ color: 'var(--rojo)' }}>(*)</span></label>
              <input className="input" type="date" value={form.fechaNac} onChange={e => set('fechaNac', e.target.value)} required />
            </div>
            <div className="field">
              <label>País de nacimiento <span style={{ color: 'var(--rojo)' }}>(*)</span></label>
              <select className="input" value={form.pais} onChange={e => set('pais', e.target.value)} required style={{ appearance: 'auto' }}>
                <option value="">Selecciona País</option>
                {PAISES_NACIMIENTO.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Sexo <span style={{ color: 'var(--rojo)' }}>(*)</span></label>
              <select className="input" value={form.sexo} onChange={e => set('sexo', e.target.value)} required style={{ appearance: 'auto' }}>
                <option value="">Seleccione una opción</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="O">Otro</option>
                <option value="N">Prefiero no indicar</option>
              </select>
            </div>
            <div className="field">
              <label>Correo electrónico <span style={{ color: 'var(--rojo)' }}>(*)</span></label>
              <input className="input" type="email" value={form.email} placeholder="correo@ejemplo.com" onChange={e => set('email', e.target.value)} required />
            </div>
            <div className="field">
              <label>Confirmar correo electrónico <span style={{ color: 'var(--rojo)' }}>(*)</span></label>
              <input className="input" type="email" value={form.emailConf} placeholder="correo@ejemplo.com" onChange={e => set('emailConf', e.target.value)} required />
            </div>
            <div className="field">
              <label>Contraseña <span style={{ color: 'var(--rojo)' }}>(*)</span></label>
              <input className="input" type="password" value={form.pass} placeholder="Mínimo 8 caracteres" onChange={e => set('pass', e.target.value)} required />
            </div>
            <div className="field">
              <label>Confirmar contraseña <span style={{ color: 'var(--rojo)' }}>(*)</span></label>
              <input className="input" type="password" value={form.passConf} placeholder="Repetí tu contraseña" onChange={e => set('passConf', e.target.value)} required />
            </div>

            <p style={{ color: 'var(--azul)', fontSize: '0.85rem', textAlign: 'center', margin: '4px 0' }}>
              Los campos marcados con (*) son obligatorios
            </p>

            {/* reCAPTCHA simulado */}
            <div style={{ border: '1px solid #d3d3d3', borderRadius: 4, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f9f9f9', maxWidth: 300, margin: '0 auto', width: '100%', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div className="row" style={{ gap: 12 }}>
                <input type="checkbox" checked={captcha} onChange={e => setCaptcha(e.target.checked)}
                  style={{ width: 24, height: 24, cursor: 'pointer', accentColor: 'var(--azul)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: '#333' }}>No soy un robot</span>
              </div>
              <div className="stack" style={{ gap: 1, alignItems: 'center' }}>
                <svg width="34" height="34" viewBox="0 0 64 64" fill="none">
                  <path d="M32 4C16.5 4 4 16.5 4 32s12.5 28 28 28 28-12.5 28-28S47.5 4 32 4z" fill="#4A90D9"/>
                  <path d="M32 11c-11.6 0-21 9.4-21 21s9.4 21 21 21 21-9.4 21-21-9.4-21-21-21z" fill="#E8F4FD"/>
                  <path d="M23 26l9-15 9 15H23z" fill="#4A90D9"/>
                  <path d="M15 40l8-14h9l-8 14H15z" fill="#2E6DA4"/>
                  <path d="M33 40l8-14h9l-8 14H33z" fill="#4A90D9" opacity=".7"/>
                </svg>
                <span style={{ fontSize: '0.58rem', color: '#555', fontWeight: 600 }}>reCAPTCHA</span>
                <span style={{ fontSize: '0.52rem', color: '#aaa' }}>Privacidad · Condiciones</span>
              </div>
            </div>

            {error && <p style={{ color: 'var(--rojo)', fontSize: '0.88rem', margin: 0, textAlign: 'center' }}>{error}</p>}

            <button className="btn btn-primary btn-lg btn-block" disabled={loading} style={{ marginTop: 4 }}>
              {loading ? <><Icon name="refresh" size={18} className="spin" /> Creando cuenta…</> : <>Crear cuenta <Icon name="arrowR" size={18} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { QRCode, PortalHeader, Brand, SectionTitle, ClaveUnica, Inicio, TRAMITES, OlvideClave, DocTypeToggle, CrearCuenta });
