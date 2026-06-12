/* caseta2.jsx — Control en caseta: escaneo, alerta verde/roja, expediente, auditoría */

function BitacoraItem({ b }) {
  const ok = b.estado === 'ok';
  return (
    <div className="row" style={{ justifyContent: 'space-between', padding: '11px 13px', borderRadius: 10, background: 'oklch(0.22 0.025 262)', border: '1px solid var(--cline)' }}>
      <div className="row" style={{ gap: 11 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, display: 'grid', placeItems: 'center', background: ok ? 'oklch(0.6 0.14 150 / 0.18)' : 'oklch(0.56 0.2 27 / 0.18)', color: ok ? 'oklch(0.78 0.14 150)' : 'oklch(0.74 0.18 27)' }}>
          <Icon name={ok ? 'check' : 'x'} size={16} stroke={2.4} />
        </div>
        <div className="stack" style={{ gap: 1 }}>
          <span className="mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>{b.rut}</span>
          <span className="cmuted" style={{ fontSize: '0.72rem' }}>{ok ? 'Autorizado' : b.motivo} · {b.org}</span>
        </div>
      </div>
      <span className="cmuted mono" style={{ fontSize: '0.74rem' }}>{b.hora}</span>
    </div>
  );
}

/* ---------- pantalla de escaneo ---------- */
function CasetaScan({ go, rol, setCaso, bitacora }) {
  const [scanning, setScanning] = React.useState(false);
  const [pending, setPending] = React.useState(null);

  const run = (caso) => {
    setScanning(true); setPending(caso);
    setTimeout(() => { setCaso(caso); go('caseta-result'); }, 2100);
  };

  return (
    <div className="wrap screen-in" style={{ padding: '30px 0 60px' }}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
        <div className="stack" style={{ gap: 6 }}>
          <h1 style={{ fontSize: '1.8rem', color: '#fff' }}>Control en caseta</h1>
          <p className="cmuted">Escanea el Pase QR del viajero o ingresa su RUT para validar el cruce en tiempo real.</p>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <span className="chip" style={{ background: 'oklch(0.3 0.04 256)', color: '#cfe0ff', border: '1px solid var(--cline)' }}><Icon name={ROLES.find(r => r.id === rol)?.icon || 'stamp'} size={14} /> Perfil {rol}</span>
          <span className="chip" style={{ background: 'oklch(0.6 0.14 150 / 0.16)', color: 'oklch(0.82 0.13 150)', border: '1px solid oklch(0.6 0.14 150 / 0.35)' }}><span className="dot" /> Enlaces activos</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* escáner */}
        <div className="cpanel cpanel-pad stack" style={{ gap: 20 }}>
          <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', background: 'oklch(0.15 0.02 262)', aspectRatio: '16 / 9', display: 'grid', placeItems: 'center' }}>
            <div style={{ backgroundImage: 'repeating-linear-gradient(45deg, oklch(1 0 0 / 0.04) 0 14px, transparent 14px 28px)', position: 'absolute', inset: 0 }} />
            <div className="stack" style={{ alignItems: 'center', gap: 10, position: 'relative', zIndex: 2 }}>
              <Icon name="qr" size={64} style={{ color: scanning ? 'oklch(0.78 0.14 150)' : 'oklch(0.5 0.02 262)' }} />
              <span className="mono cmuted" style={{ fontSize: '0.78rem' }}>{scanning ? 'Leyendo Pase ' + (pending === 'red' ? '' : '') + '…' : 'esperando Pase QR del viajero'}</span>
            </div>
            <div style={{ position: 'absolute', inset: '14% 30%', borderRadius: 14, border: '2.5px solid ' + (scanning ? 'oklch(0.78 0.14 150)' : 'oklch(0.5 0.05 262)') }} />
            {scanning && <div className="scanline" />}
          </div>

          {scanning ? (
            <div className="stack" style={{ gap: 10 }}>
              {['Hash del pase verificado', 'Cruce con PDI (arraigo)', 'Cruce con Registro Civil', 'Sincronización Aduana Argentina'].map((s, i) => (
                <div key={s} className="row" style={{ gap: 10, color: 'var(--cmuted)', fontSize: '0.9rem', fontWeight: 600 }}>
                  <Icon name="refresh" size={15} className="spin" style={{ color: 'oklch(0.7 0.1 256)' }} /> {s}
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="row" style={{ gap: 12 }}>
                <button className="btn btn-primary btn-lg" style={{ flex: 1 }} onClick={() => run('ok')}><Icon name="scan" size={19} /> Escanear Pase QR</button>
                <div className="field" style={{ flex: 1 }}>
                  <input className="input" placeholder="o ingresa el RUT del viajero…" defaultValue={VIAJERO.rut} onKeyDown={e => e.key === 'Enter' && run('ok')} />
                </div>
              </div>
              <div className="row" style={{ justifyContent: 'space-between', paddingTop: 4, borderTop: '1px solid var(--cline)' }}>
                <span className="cmuted" style={{ fontSize: '0.8rem' }}>Demostración de escenarios:</span>
                <div className="row" style={{ gap: 8 }}>
                  <button className="btn btn-ghost" style={{ background: 'oklch(0.24 0.025 262)', color: '#dfeaff', borderColor: 'var(--cline)', padding: '9px 15px', fontSize: '0.84rem' }} onClick={() => run('ok')}>✓ Cruce válido</button>
                  <button className="btn btn-ghost" style={{ background: 'oklch(0.3 0.06 27)', color: '#ffd9d3', borderColor: 'oklch(0.45 0.12 27)', padding: '9px 15px', fontSize: '0.84rem' }} onClick={() => run('red')}>⚠ Ensayar rechazo</button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* bitácora + estado */}
        <div className="stack" style={{ gap: 20, position: 'sticky', top: 86 }}>
          <div className="cpanel cpanel-pad">
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
              <div className="row" style={{ gap: 8 }}><Icon name="list" size={18} style={{ color: 'oklch(0.75 0.08 256)' }} /><h3 style={{ fontSize: '1rem' }}>Bitácora de hoy</h3></div>
              <button className="btn-quiet" style={{ color: 'var(--cmuted)', fontSize: '0.78rem', padding: '4px 10px' }} onClick={() => go('caseta-reportes')}>Ver reportes</button>
            </div>
            <div className="stack" style={{ gap: 8 }}>
              {bitacora.map((b, i) => <BitacoraItem key={i} b={b} />)}
            </div>
          </div>
          <div className="cpanel cpanel-pad">
            <h3 style={{ fontSize: '0.95rem', marginBottom: 12 }}>Estado de enlaces</h3>
            <div className="stack" style={{ gap: 10 }}>
              {[['Registro Civil', '0,4 s'], ['PDI', '0,6 s'], ['SAG', '0,5 s'], ['Aduana Argentina', '0,9 s']].map(([n, t]) => (
                <div key={n} className="row" style={{ justifyContent: 'space-between', fontSize: '0.86rem' }}>
                  <span className="row" style={{ gap: 8, fontWeight: 600 }}><span className="dot" style={{ color: 'oklch(0.7 0.14 150)' }} /> {n}</span>
                  <span className="cmuted mono">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BitacoraItem, CasetaScan });
