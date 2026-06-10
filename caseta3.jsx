/* caseta3.jsx — Resultado del control (alerta verde/roja) + Reportes */

function CasetaResult({ go, caso, rol, addBitacora }) {
  const ok = caso === 'ok';
  const [registrado, setRegistrado] = React.useState(false);

  const autorizar = () => {
    addBitacora({ rut: VIAJERO.rut, estado: 'ok', org: rol, hora: nowHM(), pase: 'FA-2026-VIAJE' });
    setRegistrado(true);
  };
  const rechazar = () => {
    addBitacora({ rut: '21.557.903-2', estado: 'red', org: rol, hora: nowHM(), pase: '—', motivo: 'Arraigo vigente' });
    setRegistrado(true);
  };

  if (registrado) {
    return (
      <div className="wrap-narrow screen-in" style={{ padding: '60px 0', display: 'grid', placeItems: 'center', minHeight: '70vh' }}>
        <div className="cpanel cpanel-pad stack" style={{ gap: 20, alignItems: 'center', textAlign: 'center', maxWidth: 460, padding: 40 }}>
          <div style={{ width: 78, height: 78, borderRadius: '50%', background: ok ? 'oklch(0.6 0.14 150 / 0.18)' : 'oklch(0.56 0.2 27 / 0.18)', color: ok ? 'oklch(0.8 0.14 150)' : 'oklch(0.75 0.18 27)', display: 'grid', placeItems: 'center' }}>
            <Icon name={ok ? 'checkCircle' : 'lock'} size={42} stroke={1.8} />
          </div>
          <h2 style={{ fontSize: '1.5rem' }}>{ok ? 'Cruce autorizado y registrado' : 'Viajero retenido · evento registrado'}</h2>
          <p className="cmuted">Se guardó en la bitácora: <strong style={{ color: '#fff' }}>{FUNCIONARIO.nombre}</strong> ({rol} · {FUNCIONARIO.codigo}) · {nowHM()} hrs. Trazabilidad completa garantizada.</p>
          <div className="row" style={{ gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => go('caseta-scan')}><Icon name="scan" size={17} /> Siguiente vehículo</button>
            <button className="btn btn-ghost" style={{ background: 'oklch(0.24 0.025 262)', color: '#dfeaff', borderColor: 'var(--cline)' }} onClick={() => go('caseta-reportes')}>Ver reportes</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap screen-in" style={{ padding: '26px 0 60px' }}>
      <button className="btn-quiet row" onClick={() => go('caseta-scan')} style={{ borderRadius: 999, color: 'var(--cmuted)', gap: 6, marginBottom: 16 }}><Icon name="arrowL" size={17} /> Volver al escáner</button>

      {/* BANNER alerta */}
      <div className="alert-pulse" style={{
        '--glow': ok ? 'oklch(0.6 0.14 150 / 0.5)' : 'oklch(0.56 0.2 27 / 0.5)',
        borderRadius: 22, padding: '30px 34px', marginBottom: 20,
        background: ok ? 'linear-gradient(120deg, oklch(0.5 0.13 150), oklch(0.42 0.12 155))' : 'linear-gradient(120deg, oklch(0.52 0.2 27), oklch(0.44 0.18 25))',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', color: '#fff',
        boxShadow: ok ? '0 20px 60px oklch(0.5 0.14 150 / 0.4)' : '0 20px 60px oklch(0.5 0.2 27 / 0.4)'
      }}>
        <div className="row" style={{ gap: 20 }}>
          <div style={{ width: 70, height: 70, borderRadius: 18, background: 'oklch(1 0 0 / 0.16)', display: 'grid', placeItems: 'center' }}>
            <Icon name={ok ? 'check' : 'x'} size={42} stroke={3} style={{ color: '#fff' }} />
          </div>
          <div className="stack" style={{ gap: 4 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'oklch(1 0 0 / 0.8)' }}>Resultado del control</span>
            <h1 style={{ color: '#fff', fontSize: '2.6rem', lineHeight: 1 }}>{ok ? 'CRUCE AUTORIZADO' : 'CRUCE RECHAZADO'}</h1>
          </div>
        </div>
        <div className="stack" style={{ alignItems: 'flex-end', gap: 6 }}>
          <span className="mono" style={{ fontSize: '0.9rem', color: 'oklch(1 0 0 / 0.85)' }}>{ok ? 'FA-2026-VIAJE' : 'sin pase válido'}</span>
          <span className="chip" style={{ background: 'oklch(1 0 0 / 0.18)', color: '#fff', border: 0 }}><Icon name="clock" size={13} /> Validado en 1,7 s</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* expediente del grupo */}
        <div className="cpanel cpanel-pad stack" style={{ gap: 18 }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.2rem' }}>Expediente del grupo familiar</h2>
            <span className="chip" style={{ background: 'oklch(0.3 0.04 256)', color: '#cfe0ff', border: '1px solid var(--cline)' }}><Icon name="users" size={14} /> {ok ? '2 personas' : '1 persona'}</span>
          </div>

          {/* titular */}
          <div className="row" style={{ gap: 14, padding: 16, borderRadius: 13, background: 'oklch(0.22 0.025 262)', border: '1px solid var(--cline)' }}>
            <div style={{ width: 50, height: 50, borderRadius: 12, background: 'var(--azul)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{ok ? 'LH' : 'RM'}</div>
            <div className="stack" style={{ gap: 2, flex: 1 }}>
              <strong style={{ color: '#fff' }}>{ok ? VIAJERO.nombre : 'Rodrigo Méndez Castro'}</strong>
              <span className="cmuted mono" style={{ fontSize: '0.8rem' }}>{ok ? VIAJERO.rut : '21.557.903-2'} · Titular</span>
            </div>
            <span className="chip" style={ok ? { background: 'oklch(0.6 0.14 150 / 0.18)', color: 'oklch(0.82 0.13 150)', border: '1px solid oklch(0.6 0.14 150 / 0.35)' } : { background: 'oklch(0.56 0.2 27 / 0.18)', color: 'oklch(0.8 0.16 27)', border: '1px solid oklch(0.56 0.2 27 / 0.4)' }}>
              {ok ? <><Icon name="check" size={13} /> Sin arraigo</> : <><Icon name="alert" size={13} /> Arraigo vigente</>}
            </span>
          </div>

          {ok ? (
            <>
              <div className="row" style={{ gap: 14, padding: 16, borderRadius: 13, background: 'oklch(0.22 0.025 262)', border: '1px solid var(--cline)' }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: 'oklch(0.4 0.06 256)', color: '#fff', display: 'grid', placeItems: 'center' }}><Icon name="user" size={24} /></div>
                <div className="stack" style={{ gap: 2, flex: 1 }}>
                  <strong style={{ color: '#fff' }}>{MENOR.nombre}</strong>
                  <span className="cmuted mono" style={{ fontSize: '0.8rem' }}>{MENOR.rut} · {MENOR.edad} años · {MENOR.vinculo}</span>
                </div>
                <span className="chip" style={{ background: 'oklch(0.6 0.14 150 / 0.18)', color: 'oklch(0.82 0.13 150)', border: '1px solid oklch(0.6 0.14 150 / 0.35)' }}><Icon name="check" size={13} /> Autorización OK</span>
              </div>
              <div className="row" style={{ gap: 14, padding: 16, borderRadius: 13, background: 'oklch(0.22 0.025 262)', border: '1px solid var(--cline)' }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: 'oklch(0.4 0.06 256)', color: '#fff', display: 'grid', placeItems: 'center' }}><Icon name="car" size={24} /></div>
                <div className="stack" style={{ gap: 2, flex: 1 }}>
                  <strong style={{ color: '#fff' }}>{VEHICULO.marca} {VEHICULO.modelo} · {VEHICULO.anio}</strong>
                  <span className="cmuted mono" style={{ fontSize: '0.8rem' }}>{VEHICULO.patente} · Salida y Admisión Temporal</span>
                </div>
                <span className="chip" style={{ background: 'oklch(0.6 0.14 150 / 0.18)', color: 'oklch(0.82 0.13 150)', border: '1px solid oklch(0.6 0.14 150 / 0.35)' }}><Icon name="globe" size={13} /> Sincronizado</span>
              </div>
            </>
          ) : (
            <div className="stack" style={{ gap: 10, padding: 18, borderRadius: 13, background: 'oklch(0.3 0.06 27 / 0.5)', border: '1px solid oklch(0.5 0.14 27)' }}>
              <div className="row" style={{ gap: 9, color: 'oklch(0.86 0.12 27)', fontWeight: 700 }}><Icon name="alert" size={18} /> Alerta silenciosa · no visible al viajero</div>
              <p style={{ fontSize: '0.9rem', color: 'oklch(0.88 0.06 27)' }}>La PDI reporta una orden de arraigo vigente que impide la salida del país. El sistema bloquea el cruce y notifica al personal sin alertar al pasajero. Aplique protocolo de retención.</p>
            </div>
          )}

          {/* organismos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
            {[['Registro Civil', true], ['PDI', ok], ['SAG', true], ['Aduana Arg.', true]].map(([n, good]) => (
              <div key={n} className="stack" style={{ gap: 6, alignItems: 'center', padding: '14px 8px', borderRadius: 11, background: 'oklch(0.2 0.025 262)', border: '1px solid var(--cline)' }}>
                <Icon name={good ? 'checkCircle' : 'alert'} size={22} style={{ color: good ? 'oklch(0.75 0.14 150)' : 'oklch(0.74 0.18 27)' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 600, textAlign: 'center', color: 'var(--cmuted)' }}>{n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* acción del funcionario */}
        <div className="cpanel cpanel-pad stack" style={{ gap: 18, position: 'sticky', top: 86 }}>
          <h3 style={{ fontSize: '1.05rem' }}>Acción de control</h3>
          <div className="stack" style={{ gap: 8, padding: 14, borderRadius: 12, background: 'oklch(0.2 0.025 262)', border: '1px solid var(--cline)' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}><span className="cmuted" style={{ fontSize: '0.8rem' }}>Funcionario</span><strong style={{ fontSize: '0.86rem' }}>{FUNCIONARIO.nombre}</strong></div>
            <div className="row" style={{ justifyContent: 'space-between' }}><span className="cmuted" style={{ fontSize: '0.8rem' }}>Organismo</span><strong style={{ fontSize: '0.86rem' }}>{rol} · {FUNCIONARIO.codigo}</strong></div>
            <div className="row" style={{ justifyContent: 'space-between' }}><span className="cmuted" style={{ fontSize: '0.8rem' }}>Caseta</span><strong style={{ fontSize: '0.86rem' }}>{FUNCIONARIO.caseta}</strong></div>
            <div className="row" style={{ justifyContent: 'space-between' }}><span className="cmuted" style={{ fontSize: '0.8rem' }}>Hora</span><strong className="mono" style={{ fontSize: '0.86rem' }}><Clock /></strong></div>
          </div>
          <p className="cmuted" style={{ fontSize: '0.82rem' }}>Cada acción queda firmada con tu código, fecha y hora en la bitácora del viaje (trazabilidad total).</p>
          {ok ? (
            <>
              <button className="btn btn-primary btn-lg btn-block" style={{ background: 'oklch(0.5 0.13 150)', boxShadow: '0 8px 26px oklch(0.5 0.14 150 / 0.4)' }} onClick={autorizar}><Icon name="stamp" size={18} /> Registrar y autorizar cruce</button>
              <button className="btn btn-block" style={{ background: 'transparent', color: 'var(--cmuted)', border: '1px solid var(--cline)' }} onClick={rechazar}>Rechazar manualmente</button>
            </>
          ) : (
            <button className="btn btn-danger btn-lg btn-block" onClick={rechazar}><Icon name="lock" size={18} /> Registrar retención</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Reportes (PDF / Excel) ---------- */
function CasetaReportes({ go, bitacora }) {
  const total = bitacora.length;
  const aut = bitacora.filter(b => b.estado === 'ok').length;
  const rech = total - aut;
  return (
    <div className="wrap screen-in" style={{ padding: '30px 0 60px' }}>
      <button className="btn-quiet row" onClick={() => go('caseta-scan')} style={{ borderRadius: 999, color: 'var(--cmuted)', gap: 6, marginBottom: 16 }}><Icon name="arrowL" size={17} /> Volver al control</button>
      <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 22 }}>
        <div className="stack" style={{ gap: 6 }}>
          <h1 style={{ fontSize: '1.8rem', color: '#fff' }}>Reportes y estadística</h1>
          <p className="cmuted">Genera informes automáticos del flujo fronterizo. Elige el formato de descarga.</p>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <button className="btn btn-ghost" style={{ background: 'oklch(0.24 0.025 262)', color: '#dfeaff', borderColor: 'var(--cline)' }}><Icon name="download" size={17} /> Exportar PDF</button>
          <button className="btn btn-ghost" style={{ background: 'oklch(0.3 0.07 150)', color: '#d6ffe6', borderColor: 'oklch(0.45 0.1 150)' }}><Icon name="download" size={17} /> Exportar Excel</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 20 }}>
        {[['Cruces hoy', total, 'list', '#cfe0ff'], ['Autorizados', aut, 'check', 'oklch(0.82 0.13 150)'], ['Rechazados', rech, 'x', 'oklch(0.8 0.16 27)'], ['Tiempo medio', '1,7 s', 'clock', '#cfe0ff']].map(([k, v, ic, col]) => (
          <div key={k} className="cpanel cpanel-pad stack" style={{ gap: 10 }}>
            <Icon name={ic} size={22} style={{ color: col }} />
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: '#fff' }}>{v}</div>
            <span className="cmuted" style={{ fontSize: '0.82rem' }}>{k}</span>
          </div>
        ))}
      </div>

      <div className="cpanel" style={{ overflow: 'hidden' }}>
        <div className="row" style={{ justifyContent: 'space-between', padding: '18px 22px', borderBottom: '1px solid var(--cline)' }}>
          <h3 style={{ fontSize: '1.05rem' }}>Bitácora de auditoría</h3>
          <span className="cmuted" style={{ fontSize: '0.82rem' }}>Trazabilidad por funcionario · fecha · hora</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 0.8fr 0.8fr', padding: '12px 22px', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--cmuted)', fontWeight: 700, borderBottom: '1px solid var(--cline)' }}>
          <span>RUT viajero</span><span>Resultado</span><span>Organismo</span><span>Pase</span><span style={{ textAlign: 'right' }}>Hora</span>
        </div>
        {bitacora.map((b, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 0.8fr 0.8fr', padding: '14px 22px', alignItems: 'center', borderBottom: i < bitacora.length - 1 ? '1px solid oklch(0.28 0.025 262)' : 0, fontSize: '0.86rem' }}>
            <span className="mono" style={{ color: '#fff', fontWeight: 600 }}>{b.rut}</span>
            <span>{b.estado === 'ok' ? <span style={{ color: 'oklch(0.8 0.13 150)', fontWeight: 700 }}>● Autorizado</span> : <span style={{ color: 'oklch(0.78 0.16 27)', fontWeight: 700 }}>● {b.motivo || 'Rechazado'}</span>}</span>
            <span className="cmuted">{b.org}</span>
            <span className="mono cmuted" style={{ fontSize: '0.78rem' }}>{b.pase}</span>
            <span className="mono cmuted" style={{ textAlign: 'right' }}>{b.hora}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function nowHM() { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }

Object.assign(window, { CasetaResult, CasetaReportes, nowHM });
