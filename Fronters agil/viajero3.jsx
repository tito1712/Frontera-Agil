/* viajero3.jsx — Vehículo (RF-04) y Pase QR Unificado (RF-05) */

/* ============================================================
   Vehículo (RF-04 + sincronización binacional RF-06)
   ============================================================ */
function Vehiculo({ go, setExp }) {
  const [step, setStep] = React.useState('input'); // input | result | done
  const [patente, setPatente] = React.useState(VEHICULO.patente);
  const [loading, setLoading] = React.useState(false);

  const consultar = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('result'); }, 1600);
  };
  const finish = () => { setExp(e => ({ ...e, vehiculo: true })); go('inicio'); };

  return (
    <div className="wrap-narrow screen-in" style={{ padding: '34px 0 70px' }}>
      <SectionTitle go={go} back="inicio" kicker="RF-04 · Vehículo particular" title="Salida y Admisión Temporal" desc="Validamos la propiedad del vehículo con el Registro de Vehículos Motorizados y emitimos el documento que reconoce la Aduana Argentina." />

      {step === 'input' && (
        <div className="card card-pad stack" style={{ gap: 20 }}>
          <h3 style={{ fontSize: '1.1rem' }}>Ingresa la patente del vehículo</h3>
          <div className="row" style={{ gap: 12, alignItems: 'flex-end' }}>
            <div className="field" style={{ flex: 1 }}>
              <label>Placa patente</label>
              <input className="input mono" style={{ fontSize: '1.4rem', letterSpacing: '0.12em', textAlign: 'center', fontWeight: 700 }} value={patente} onChange={e => setPatente(e.target.value.toUpperCase())} />
            </div>
            <button className="btn btn-primary btn-lg" onClick={consultar} disabled={loading} style={{ height: 56 }}>
              {loading ? <Icon name="refresh" size={19} className="spin" /> : <Icon name="scan" size={19} />}
              {loading ? 'Consultando RVM…' : 'Consultar'}
            </button>
          </div>
          <p className="muted row" style={{ gap: 8, fontSize: '0.85rem' }}><Icon name="lock" size={14} /> Cruzamos la patente con el RVM para verificar propiedad y encargos por robo.</p>
        </div>
      )}

      {step === 'result' && (
        <div className="card card-pad stack screen-in" style={{ gap: 18 }}>
          <div className="chip chip-ok" style={{ alignSelf: 'flex-start' }}><Icon name="check" size={14} /> Vehículo válido · sin encargo por robo</div>
          <div className="row" style={{ gap: 16, padding: 18, background: 'var(--surface-2)', borderRadius: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: 13, background: 'var(--azul-50)', color: 'var(--azul)', display: 'grid', placeItems: 'center' }}><Icon name="car" size={28} /></div>
            <div className="stack" style={{ gap: 3 }}>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>{VEHICULO.marca} {VEHICULO.modelo} · {VEHICULO.anio}</strong>
              <span className="muted mono" style={{ fontSize: '0.85rem', letterSpacing: '0.08em' }}>{patente} · {VEHICULO.color}</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['Propietario', VIAJERO.nombre.split(' ').slice(0, 2).join(' ')], ['Estado legal', 'Apto para salir'], ['Acuerdo', 'Chileno–Argentino'], ['Documento', 'Salida y Adm. Temporal']].map(([k, v]) => (
              <div key={k} style={{ padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 10 }}>
                <div className="muted" style={{ fontSize: '0.72rem' }}>{k}</div><div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{v}</div>
              </div>
            ))}
          </div>
          <div className="row" style={{ gap: 10, padding: 14, border: '1px dashed var(--azul-100)', background: 'var(--azul-50)', borderRadius: 12 }}>
            <Icon name="globe" size={20} style={{ color: 'var(--azul)' }} />
            <span style={{ fontSize: '0.88rem', color: 'var(--azul-700)', fontWeight: 600 }}>Se enviará una copia a la Dirección General de Aduanas de Argentina para el reconocimiento mutuo.</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={() => setStep('done')}>Emitir documento digital <Icon name="stamp" size={18} /></button>
        </div>
      )}

      {step === 'done' && (
        <div className="card card-pad stack screen-in" style={{ gap: 20, alignItems: 'center', textAlign: 'center', borderColor: 'oklch(0.85 0.08 150)' }}>
          <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--ok-50)', color: 'var(--ok-700)', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 8px var(--ok-50)' }}><Icon name="checkCircle" size={48} stroke={1.8} /></div>
          <div className="stack" style={{ gap: 8 }}>
            <h2 style={{ fontSize: '1.5rem' }}>Vehículo aprobado para el tránsito</h2>
            <p className="muted" style={{ maxWidth: 430 }}>El documento de Salida y Admisión Temporal fue emitido y sincronizado con la Aduana Argentina.</p>
          </div>
          <button className="btn btn-primary btn-lg btn-block" onClick={finish} style={{ maxWidth: 360 }}>Continuar con el expediente <Icon name="arrowR" size={18} /></button>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Pase QR Unificado (RF-05)
   ============================================================ */
function Pase({ go, pase, setPase, exp = {} }) {
  const [generating, setGenerating] = React.useState(!pase);
  React.useEffect(() => {
    if (!pase) {
      const id = 'FA-2026-' + Math.random().toString(36).slice(2, 8).toUpperCase();
      const t = setTimeout(() => { setPase({ id, emitido: '13 ene 2026 · 21:04' }); setGenerating(false); }, 1900);
      return () => clearTimeout(t);
    }
  }, []);

  if (generating || !pase) {
    return (
      <div className="wrap-narrow screen-in" style={{ padding: '60px 0', display: 'grid', placeItems: 'center', minHeight: '70vh' }}>
        <div className="stack" style={{ gap: 22, alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 70, height: 70, borderRadius: 18, background: 'var(--azul)', color: '#fff', display: 'grid', placeItems: 'center', boxShadow: 'var(--sh-azul)' }}><Icon name="refresh" size={34} className="spin" /></div>
          <div className="stack" style={{ gap: 6 }}>
            <h2 style={{ fontSize: '1.4rem' }}>Consolidando tu expediente…</h2>
            <p className="muted">Generando hash único y firmando el pase con la llave del Estado.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap-narrow screen-in" style={{ padding: '34px 0 70px' }}>
      <SectionTitle go={go} back="inicio" kicker="RF-05 · Pase QR Unificado" title="Tu Pase de Tránsito está listo" desc="Este es el único documento que mostrarás en la caseta. Reúne todos tus trámites aprobados en un solo código seguro." />

      <div className="card" style={{ overflow: 'hidden', borderColor: 'transparent', boxShadow: 'var(--sh-lg)' }}>
        {/* cabecera del ticket */}
        <div className="row" style={{ justifyContent: 'space-between', padding: '20px 26px', background: 'linear-gradient(120deg, var(--azul-700), var(--azul-900))', color: '#fff' }}>
          <Brand light />
          <div className="stack" style={{ alignItems: 'flex-end', gap: 2 }}>
            <span className="chip chip-ok" style={{ background: 'oklch(0.6 0.14 150 / 0.2)', color: '#d6ffe6', border: '1px solid oklch(0.6 0.14 150 / 0.4)' }}><span className="dot" style={{ color: '#6ee7a8' }} /> Pase activo</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr' }}>
          {/* QR */}
          <div className="stack" style={{ alignItems: 'center', justifyContent: 'center', padding: 30, gap: 14, borderRight: '2px dashed var(--line)' }}>
            <div style={{ padding: 14, background: '#fff', borderRadius: 18, boxShadow: 'var(--sh)' }}>
              <QRCode seed={pase.id} size={188} fg="oklch(0.27 0.07 258)" />
            </div>
            <div className="stack" style={{ alignItems: 'center', gap: 2 }}>
              <span className="mono" style={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.06em' }}>{pase.id}</span>
              <span className="muted" style={{ fontSize: '0.76rem' }}>Emitido {pase.emitido}</span>
            </div>
          </div>
          {/* detalle */}
          <div className="stack card-pad" style={{ gap: 16, justifyContent: 'center' }}>
            <div className="stack" style={{ gap: 3 }}>
              <span className="muted" style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Titular</span>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>{VIAJERO.nombre}</strong>
              <span className="muted mono" style={{ fontSize: '0.82rem' }}>{VIAJERO.rut}</span>
            </div>
            <div style={{ height: 1, background: 'var(--line)' }} />
            <div className="stack" style={{ gap: 9 }}>
              {[
                exp.identidad !== false && ['finger', 'Identidad y PDI', 'Sin arraigo'],
                exp.menores     && ['users', '1 menor', 'Autorización OK'],
                exp.vehiculo    && ['car', VEHICULO.marca + ' ' + VEHICULO.modelo, 'Salida temporal'],
                exp.vehiculo    && ['globe', 'Aduana Argentina', 'Sincronizado'],
                exp.sag         && ['flag', 'Declaración SAG', 'Emitida'],
              ].filter(Boolean).map(([ic, a, b]) => (
                <div key={a} className="row" style={{ justifyContent: 'space-between' }}>
                  <div className="row" style={{ gap: 9 }}><Icon name={ic} size={17} style={{ color: 'var(--azul)' }} /><span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{a}</span></div>
                  <span className="chip chip-ok" style={{ padding: '3px 9px', fontSize: '0.72rem' }}><Icon name="check" size={12} /> {b}</span>
                </div>
              ))}
            </div>
            <div className="row muted" style={{ gap: 8, fontSize: '0.78rem', marginTop: 2 }}><Icon name="pin" size={14} /> {PASO}</div>
          </div>
        </div>
      </div>

      {/* acciones */}
      <div className="row" style={{ gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
        <button className="btn btn-ghost" style={{ flex: 1 }}><Icon name="download" size={17} /> Descargar PDF offline</button>
        <button className="btn btn-ghost" style={{ flex: 1 }}><Icon name="bell" size={17} /> Enviar a mi correo</button>
        <button className="btn btn-primary" style={{ flex: 1.3 }} onClick={() => go('caseta-scan')}><Icon name="scan" size={18} /> Simular llegada a caseta</button>
      </div>
      <p className="center muted" style={{ fontSize: '0.8rem', marginTop: 14 }}>Aumentaremos el brillo de tu pantalla automáticamente para facilitar la lectura del QR en la caseta.</p>
    </div>
  );
}

Object.assign(window, { Vehiculo, Pase });
