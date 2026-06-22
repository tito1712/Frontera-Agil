/* caseta.jsx — Consola del Fiscalizador (control en caseta) */

function Clock() {
  const [t, setT] = React.useState(new Date());
  React.useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  const p = n => String(n).padStart(2, '0');
  return <span className="mono tnum">{p(t.getHours())}:{p(t.getMinutes())}:{p(t.getSeconds())}</span>;
}

function ConsoleHeader({ rol, onLogout }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'oklch(1 0 0 / 0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)' }}>
      <div className="wrap row" style={{ height: 66, justifyContent: 'space-between' }}>
        <div className="row" style={{ gap: 14 }}>
          <div className="row" style={{ gap: 11 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--azul)', display: 'grid', placeItems: 'center' }}><Icon name="shield" size={21} stroke={2} style={{ color: '#fff' }} /></div>
            <div className="stack" style={{ lineHeight: 1.05 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.02rem', color: 'var(--ink)' }}>Frontera Ágil</span>
              <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>Consola de Caseta</span>
            </div>
          </div>
          <div style={{ width: 1, height: 28, background: 'var(--line)' }} />
          <div className="row muted" style={{ gap: 8, fontSize: '0.84rem', fontWeight: 600 }}><Icon name="pin" size={16} /> {FUNCIONARIO.caseta} · {FUNCIONARIO.paso}</div>
        </div>
        <div className="row" style={{ gap: 16 }}>
          <div className="row muted" style={{ gap: 8, fontSize: '0.88rem', fontWeight: 700 }}><Icon name="clock" size={16} /> <Clock /></div>
          <div className="row" style={{ gap: 9, padding: '6px 6px 6px 13px', border: '1px solid var(--line)', borderRadius: 999, background: 'var(--surface)', boxShadow: 'var(--sh-sm)' }}>
            <div className="stack" style={{ alignItems: 'flex-end', lineHeight: 1.15 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink)' }}>{FUNCIONARIO.nombre}</span>
              <span className="mono" style={{ fontSize: '0.66rem', color: 'var(--muted)' }}>{rol} · {FUNCIONARIO.codigo}</span>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--rojo)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '0.85rem' }}>SV</div>
          </div>
          <button className="btn-quiet row" onClick={onLogout} title="Salir" style={{ borderRadius: 999, padding: 9 }}><Icon name="logout" size={18} /></button>
        </div>
      </div>
    </header>
  );
}

/* ---------- login funcionario (rol) ---------- */
const ROLES = [
  { id: 'Aduanas', icon: 'stamp', desc: 'Control documental y vehículos' },
  { id: 'PDI', icon: 'finger', desc: 'Control migratorio y menores' },
  { id: 'SAG', icon: 'flag', desc: 'Declaraciones fitosanitarias' },
];

function CasetaLogin({ go, setRol }) {
  const [sel, setSel] = React.useState('Aduanas');
  return (
    <div className="screen-in" style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 40, background: 'var(--bg)' }}>
      <div className="card card-pad stack" style={{ width: 'min(460px, 100%)', gap: 22, padding: 34 }}>
        <div className="stack" style={{ gap: 10 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: 'var(--azul)', display: 'grid', placeItems: 'center' }}><Icon name="shield" size={26} stroke={2} style={{ color: '#fff' }} /></div>
          <h2 style={{ fontSize: '1.5rem' }}>Acceso de fiscalizador</h2>
          <p className="muted">Selecciona tu organismo. La consola priorizará la información que te compete.</p>
        </div>
        <div className="stack" style={{ gap: 10 }}>
          {ROLES.map(r => (
            <button key={r.id} onClick={() => setSel(r.id)} className="row" style={{ gap: 14, textAlign: 'left', padding: 14, borderRadius: 13, cursor: 'pointer', background: sel === r.id ? 'var(--azul-50)' : 'var(--surface)', border: '1.5px solid ' + (sel === r.id ? 'var(--azul)' : 'var(--line)') }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: sel === r.id ? 'var(--azul)' : 'var(--azul-50)', color: sel === r.id ? '#fff' : 'var(--azul)', display: 'grid', placeItems: 'center' }}><Icon name={r.icon} size={22} /></div>
              <div className="stack" style={{ gap: 2, flex: 1 }}>
                <strong style={{ color: 'var(--ink)' }}>{r.id}</strong>
                <span className="muted" style={{ fontSize: '0.82rem' }}>{r.desc}</span>
              </div>
              <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid ' + (sel === r.id ? 'var(--azul)' : 'var(--line)'), background: sel === r.id ? 'var(--azul)' : 'transparent', display: 'grid', placeItems: 'center' }}>{sel === r.id && <Icon name="check" size={12} style={{ color: '#fff' }} stroke={3} />}</div>
            </button>
          ))}
        </div>
        <div className="field"><label>Código de funcionario</label><input className="input mono" defaultValue={FUNCIONARIO.codigo} /></div>
        <button className="btn btn-primary btn-lg btn-block" onClick={() => { setRol(sel); go('caseta-scan'); }}>Ingresar a la consola <Icon name="arrowR" size={18} /></button>
      </div>
    </div>
  );
}

/* ---------- bitácora simulada (auditoría) ---------- */
const BITACORA_SEED = [
  { rut: '12.880.451-3', estado: 'ok', org: 'Aduanas', hora: '20:58', pase: 'FA-2026-K3M9QX' },
  { rut: '9.114.207-6', estado: 'red', org: 'PDI', hora: '20:51', pase: 'FA-2026-PP1A7C', motivo: 'Arraigo vigente' },
  { rut: '17.402.119-K', estado: 'ok', org: 'SAG', hora: '20:44', pase: 'FA-2026-7HB2LM' },
];

Object.assign(window, { Clock, ConsoleHeader, CasetaLogin, ROLES, BITACORA_SEED });
