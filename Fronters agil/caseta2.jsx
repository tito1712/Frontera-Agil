/* caseta2.jsx — Control en caseta: escaneo, alerta verde/roja, expediente, auditoría */

function BitacoraItem({ b }) {
  const ok = b.estado === 'ok';
  return (
    <div className="row" style={{ justifyContent: 'space-between', padding: '11px 13px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
      <div className="row" style={{ gap: 11 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, display: 'grid', placeItems: 'center', background: ok ? 'var(--ok-50)' : 'var(--danger-50)', color: ok ? 'var(--ok-700)' : 'var(--danger)' }}>
          <Icon name={ok ? 'check' : 'x'} size={16} stroke={2.4} />
        </div>
        <div className="stack" style={{ gap: 1 }}>
          <span className="mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink)' }}>{b.rut}</span>
          <span className="muted" style={{ fontSize: '0.72rem' }}>{ok ? 'Autorizado' : b.motivo} · {b.org}</span>
        </div>
      </div>
      <span className="muted mono" style={{ fontSize: '0.74rem' }}>{b.hora}</span>
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
          <h1 style={{ fontSize: '1.8rem' }}>Control en caseta</h1>
          <p className="muted">Escanea el Pase QR del viajero o ingresa su RUT para validar el cruce en tiempo real.</p>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <span className="chip"><Icon name={ROLES.find(r => r.id === rol)?.icon || 'stamp'} size={14} /> Perfil {rol}</span>
          <span className="chip chip-ok"><span className="dot" /> Enlaces activos</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* escáner */}
        <div className="card card-pad stack" style={{ gap: 20 }}>
          <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', background: 'var(--azul-50)', aspectRatio: '16 / 9', display: 'grid', placeItems: 'center' }}>
            <div style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--azul-100) 0 14px, transparent 14px 28px)', position: 'absolute', inset: 0 }} />
            <div className="stack" style={{ alignItems: 'center', gap: 10, position: 'relative', zIndex: 2 }}>
              <Icon name="qr" size={64} style={{ color: scanning ? 'var(--ok)' : 'var(--muted)' }} />
              <span className="mono muted" style={{ fontSize: '0.78rem' }}>{scanning ? 'Leyendo Pase ' + (pending === 'red' ? '' : '') + '…' : 'esperando Pase QR del viajero'}</span>
            </div>
            <div style={{ position: 'absolute', inset: '14% 30%', borderRadius: 14, border: '2.5px solid ' + (scanning ? 'var(--ok)' : 'var(--line)') }} />
            {scanning && <div className="scanline" />}
          </div>

          {scanning ? (
            <div className="stack" style={{ gap: 10 }}>
              {['Hash del pase verificado', 'Cruce con PDI (arraigo)', 'Cruce con Registro Civil', 'Sincronización Aduana Argentina'].map((s, i) => (
                <div key={s} className="row" style={{ gap: 10, color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                  <Icon name="refresh" size={15} className="spin" style={{ color: 'var(--azul)' }} /> {s}
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
              <div className="row" style={{ justifyContent: 'space-between', paddingTop: 4, borderTop: '1px solid var(--line)' }}>
                <span className="muted" style={{ fontSize: '0.8rem' }}>Demostración de escenarios:</span>
                <div className="row" style={{ gap: 8 }}>
                  <button className="btn btn-ghost" style={{ padding: '9px 15px', fontSize: '0.84rem' }} onClick={() => run('ok')}>✓ Cruce válido</button>
                  <button className="btn btn-ghost" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', padding: '9px 15px', fontSize: '0.84rem' }} onClick={() => run('red')}>⚠ Ensayar rechazo</button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* bitácora + estado */}
        <div className="stack" style={{ gap: 20, position: 'sticky', top: 86 }}>
          <div className="card card-pad">
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
              <div className="row" style={{ gap: 8 }}><Icon name="list" size={18} style={{ color: 'var(--azul)' }} /><h3 style={{ fontSize: '1rem' }}>Bitácora de hoy</h3></div>
              <button className="btn-quiet" style={{ fontSize: '0.78rem', padding: '4px 10px' }} onClick={() => go('caseta-reportes')}>Ver reportes</button>
            </div>
            <div className="stack" style={{ gap: 8 }}>
              {bitacora.map((b, i) => <BitacoraItem key={i} b={b} />)}
            </div>
          </div>
          <div className="card card-pad">
            <h3 style={{ fontSize: '0.95rem', marginBottom: 12 }}>Estado de enlaces</h3>
            <div className="stack" style={{ gap: 10 }}>
              {[['Registro Civil', '0,4 s'], ['PDI', '0,6 s'], ['SAG', '0,5 s'], ['Aduana Argentina', '0,9 s']].map(([n, t]) => (
                <div key={n} className="row" style={{ justifyContent: 'space-between', fontSize: '0.86rem' }}>
                  <span className="row" style={{ gap: 8, fontWeight: 600 }}><span className="dot" style={{ color: 'var(--ok)' }} /> {n}</span>
                  <span className="muted mono">{t}</span>
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
