/* viajero2.jsx — pantallas de trámite del Viajero */

/* mini reusable: línea de verificación con organismo */
function CheckLine({ label, org, state }) {
  // state: 'wait' | 'run' | 'ok'
  const map = {
    wait: { ic: 'clock', col: 'var(--muted)', bg: 'var(--surface-2)', txt: 'En espera' },
    run:  { ic: 'refresh', col: 'var(--azul)', bg: 'var(--azul-50)', txt: 'Consultando…' },
    ok:   { ic: 'check', col: 'var(--ok-700)', bg: 'var(--ok-50)', txt: 'Verificado' },
  }[state];
  return (
    <div className="row" style={{ justifyContent: 'space-between', padding: '14px 16px', border: '1px solid var(--line)', borderRadius: 12, background: state === 'ok' ? 'var(--ok-50)' : 'var(--surface)', borderColor: state === 'ok' ? 'oklch(0.85 0.08 150)' : 'var(--line)', transition: 'all .3s' }}>
      <div className="row" style={{ gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: map.bg, color: map.col, display: 'grid', placeItems: 'center' }}>
          <Icon name={map.ic} size={18} className={state === 'run' ? 'spin' : ''} stroke={state === 'ok' ? 2.4 : 1.8} />
        </div>
        <div className="stack" style={{ gap: 2 }}>
          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{label}</span>
          <span className="muted" style={{ fontSize: '0.78rem' }}>{org}</span>
        </div>
      </div>
      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: map.col }}>{map.txt}</span>
    </div>
  );
}

/* ============================================================
   Identidad (RF-02.1 escaneo QR cédula + RF-02.2 arraigo PDI)
   ============================================================ */
function Identidad({ go, setExp }) {
  const [phase, setPhase] = React.useState('intro'); // intro | scanning | checking | done
  const [checks, setChecks] = React.useState(['wait', 'wait', 'wait']);

  const startScan = () => {
    setPhase('scanning');
    setTimeout(() => { setPhase('checking'); runChecks(); }, 2200);
  };
  const runChecks = () => {
    const seq = [0, 1, 2];
    seq.forEach((i, k) => {
      setTimeout(() => setChecks(c => c.map((v, j) => j === i ? 'run' : v)), 300 + k * 1100);
      setTimeout(() => setChecks(c => c.map((v, j) => j === i ? 'ok' : v)), 300 + k * 1100 + 900);
    });
    setTimeout(() => setPhase('done'), 300 + seq.length * 1100 + 400);
  };
  const finish = () => { setExp(e => ({ ...e, identidad: true })); go('inicio'); };

  return (
    <div className="wrap-narrow screen-in" style={{ padding: '34px 0 70px' }}>
      <SectionTitle go={go} back="inicio" kicker="RF-02 · Identidad" title="Validación de identidad" desc="Confirmamos que el documento es real y que estás físicamente presente. Luego revisamos antecedentes con la PDI." />

      {phase !== 'done' && (
        <div className="card card-pad stack" style={{ gap: 22, alignItems: 'center', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: 260, height: 260, borderRadius: 22, overflow: 'hidden', background: 'var(--azul-900)' }}>
            <div className="ph" style={{ position: 'absolute', inset: 0, border: 0, borderRadius: 0, color: 'oklch(1 0 0 / 0.4)', background: 'transparent', backgroundImage: 'repeating-linear-gradient(45deg, oklch(1 0 0 / 0.05) 0 12px, transparent 12px 24px)' }}>
              <div className="stack" style={{ gap: 8, alignItems: 'center' }}>
                <Icon name="qr" size={54} style={{ color: 'oklch(1 0 0 / 0.55)' }} />
                <span className="mono" style={{ fontSize: '0.7rem' }}>reverso de la cédula</span>
              </div>
            </div>
            {/* marco de escaneo */}
            <div style={{ position: 'absolute', inset: 36, borderRadius: 16, border: '2.5px solid oklch(1 0 0 / 0.9)', boxShadow: '0 0 0 999px oklch(0.27 0.07 258 / 0.35)' }} />
            {(phase === 'scanning') && <div className="scanline" />}
          </div>
          {phase === 'intro' && (
            <>
              <p className="muted" style={{ maxWidth: 380 }}>Apunta la cámara al código QR del reverso de tu cédula de identidad. La decodificación tarda menos de 2 segundos.</p>
              <button className="btn btn-primary btn-lg" onClick={startScan}><Icon name="camera" size={19} /> Activar cámara y escanear</button>
            </>
          )}
          {phase === 'scanning' && <div className="row" style={{ gap: 10, color: 'var(--azul)', fontWeight: 700 }}><Icon name="refresh" size={18} className="spin" /> Decodificando cédula…</div>}
          {phase === 'checking' && (
            <div className="stack" style={{ gap: 10, width: '100%', textAlign: 'left' }}>
              <div className="chip chip-ok" style={{ alignSelf: 'center', marginBottom: 4 }}><Icon name="check" size={14} /> Documento decodificado · RUT {VIAJERO.rut}</div>
              <CheckLine label="Identidad y vigencia del documento" org="Servicio de Registro Civil e Identificación" state={checks[0]} />
              <CheckLine label="Coincidencia con la sesión Clave Única" org="Frontera Ágil" state={checks[1]} />
              <CheckLine label="Órdenes de arraigo y migración" org="Policía de Investigaciones (PDI)" state={checks[2]} />
            </div>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="card card-pad stack screen-in" style={{ gap: 20, alignItems: 'center', textAlign: 'center', borderColor: 'oklch(0.85 0.08 150)' }}>
          <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--ok-50)', color: 'var(--ok-700)', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 8px var(--ok-50)' }}><Icon name="checkCircle" size={48} stroke={1.8} /></div>
          <div className="stack" style={{ gap: 8 }}>
            <h2 style={{ fontSize: '1.5rem' }}>Identidad verificada</h2>
            <p className="muted" style={{ maxWidth: 420 }}>Tu documento es válido, eres el titular y no registras impedimentos para salir del país. Sin antecedentes de arraigo.</p>
          </div>
          <div className="row" style={{ gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <span className="chip chip-ok"><Icon name="check" size={14} /> Registro Civil</span>
            <span className="chip chip-ok"><Icon name="check" size={14} /> PDI · Sin arraigo</span>
            <span className="chip chip-neutral"><Icon name="clock" size={13} /> 1,8 s</span>
          </div>
          <button className="btn btn-primary btn-lg btn-block" onClick={finish} style={{ maxWidth: 360 }}>Continuar con el expediente <Icon name="arrowR" size={18} /></button>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Menores (RF-02.3 tutela + autorización notarial)
   ============================================================ */
const VINCULOS_MENOR = ['Hijo', 'Hija', 'Nieto', 'Nieta', 'Sobrino', 'Sobrina', 'Tutor/a legal'];

function Menores({ go, setExp }) {
  const [step, setStep] = React.useState('add'); // add | vinculo | notarial | done
  const [folio] = React.useState('SAG-' + Math.floor(100000 + Math.random() * 800000));
  const [uploaded, setUploaded] = React.useState(false);
  const [checking, setChecking] = React.useState(false);
  const [docNum, setDocNum] = React.useState(MENOR.rut);
  const [nombre, setNombre] = React.useState(MENOR.nombre);
  const [vinculo, setVinculo] = React.useState(MENOR.vinculo);
  const [edad, setEdad] = React.useState(String(MENOR.edad));

  const buscarVinculo = () => {
    setChecking(true);
    setTimeout(() => { setChecking(false); setStep('vinculo'); }, 1500);
  };
  const finish = () => { setExp(e => ({ ...e, menores: true })); go('inicio'); };

  return (
    <div className="wrap-narrow screen-in" style={{ padding: '34px 0 70px' }}>
      <SectionTitle go={go} back="inicio" kicker="RF-02.3 · Menores de edad" title="Autorización de viaje de menores" desc="Verificamos el vínculo con el Registro Civil y la autorización notarial necesaria para que un menor salga del país." />

      {step === 'add' && (
        <div className="card card-pad stack" style={{ gap: 20 }}>
          <h3 style={{ fontSize: '1.1rem' }}>Agregar acompañante menor de edad</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="field">
              <label>RUT del menor</label>
              <input className="input mono" value={docNum}
                placeholder="12.345.678-9"
                onChange={e => setDocNum(formatRUT(e.target.value))}
                maxLength={12} />
            </div>
            <div className="field">
              <label>Nombre completo</label>
              <input className="input" value={nombre} onChange={e => setNombre(e.target.value)} />
            </div>
            <div className="field">
              <label>Vínculo</label>
              <select className="input" value={vinculo} onChange={e => setVinculo(e.target.value)}>
                {VINCULOS_MENOR.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Edad</label>
              <select className="input" value={edad} onChange={e => setEdad(e.target.value)}>
                {Array.from({ length: 18 }, (_, i) => (
                  <option key={i} value={String(i)}>{i} {i === 1 ? 'año' : 'años'}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" onClick={buscarVinculo} disabled={checking}>
              {checking ? <><Icon name="refresh" size={17} className="spin" /> Cruzando con Registro Civil…</> : <>Validar vínculo <Icon name="arrowR" size={17} /></>}
            </button>
          </div>
        </div>
      )}

      {step === 'vinculo' && (
        <div className="card card-pad stack screen-in" style={{ gap: 18 }}>
          <div className="chip chip-ok" style={{ alignSelf: 'flex-start' }}><Icon name="check" size={14} /> Vínculo confirmado con el Registro Civil</div>
          <div className="row" style={{ gap: 14, padding: 16, background: 'var(--surface-2)', borderRadius: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: 'var(--azul-50)', color: 'var(--azul)', display: 'grid', placeItems: 'center' }}><Icon name="user" size={22} /></div>
            <div className="stack" style={{ gap: 2 }}>
              <strong>{MENOR.nombre}</strong>
              <span className="muted" style={{ fontSize: '0.85rem' }}>{MENOR.rut} · {MENOR.edad} años · {MENOR.vinculo} de {VIAJERO.nombre.split(' ')[0]}</span>
            </div>
          </div>
          <div className="stack" style={{ gap: 10, padding: 16, border: '1px solid var(--warn-50)', background: 'var(--warn-50)', borderRadius: 12 }}>
            <div className="row" style={{ gap: 9, color: 'oklch(0.5 0.12 70)', fontWeight: 700 }}><Icon name="alert" size={18} /> Falta autorización del segundo padre/madre</div>
            <p style={{ fontSize: '0.9rem', color: 'oklch(0.45 0.06 70)' }}>El menor no viaja con ambos padres. Sube la autorización notarial digitalizada (PDF) para continuar.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setStep('notarial')}>Subir autorización notarial <Icon name="arrowR" size={17} /></button>
        </div>
      )}

      {step === 'notarial' && (
        <div className="card card-pad stack screen-in" style={{ gap: 18 }}>
          <h3 style={{ fontSize: '1.1rem' }}>Autorización notarial de salida</h3>
          {!uploaded ? (
            <button className="ph" onClick={() => setUploaded(true)} style={{ minHeight: 180, cursor: 'pointer', width: '100%', background: 'var(--surface-2)' }}>
              <div className="stack" style={{ gap: 10, alignItems: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--azul-50)', color: 'var(--azul)', display: 'grid', placeItems: 'center' }}><Icon name="file" size={26} /></div>
                <strong style={{ fontFamily: 'var(--font-body)' }}>Arrastra el PDF o toma una foto del poder notarial</strong>
                <span className="muted" style={{ fontSize: '0.82rem' }}>PDF o imagen · máx. 10 MB · se asocia a tu RUT automáticamente</span>
              </div>
            </button>
          ) : (
            <div className="stack screen-in" style={{ gap: 16 }}>
              <div className="row" style={{ justifyContent: 'space-between', padding: 16, border: '1px solid oklch(0.85 0.08 150)', background: 'var(--ok-50)', borderRadius: 12 }}>
                <div className="row" style={{ gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: '#fff', color: 'var(--rojo)', display: 'grid', placeItems: 'center', border: '1px solid var(--line)' }}><Icon name="file" size={20} /></div>
                  <div className="stack" style={{ gap: 2 }}><strong style={{ fontSize: '0.92rem' }}>autorizacion_notarial.pdf</strong><span className="muted mono" style={{ fontSize: '0.74rem' }}>Folio {folio} · 1,2 MB</span></div>
                </div>
                <span className="chip chip-ok"><Icon name="check" size={13} /> Adjunto</span>
              </div>
              <p className="muted" style={{ fontSize: '0.88rem' }}>La Policía de Investigaciones recibirá este documento en pantalla apenas tu familia llegue al control. Te notificaremos por correo si es aprobado o rechazado.</p>
              <button className="btn btn-primary btn-block" onClick={() => setStep('done')}>Confirmar autorización <Icon name="check" size={17} /></button>
            </div>
          )}
        </div>
      )}

      {step === 'done' && (
        <div className="card card-pad stack screen-in" style={{ gap: 20, alignItems: 'center', textAlign: 'center', borderColor: 'oklch(0.85 0.08 150)' }}>
          <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--ok-50)', color: 'var(--ok-700)', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 8px var(--ok-50)' }}><Icon name="checkCircle" size={48} stroke={1.8} /></div>
          <div className="stack" style={{ gap: 8 }}>
            <h2 style={{ fontSize: '1.5rem' }}>Menor habilitado en el expediente</h2>
            <p className="muted" style={{ maxWidth: 420 }}>{MENOR.nombre} quedó vinculada legalmente a tu tránsito. Folio de seguimiento <span className="mono" style={{ color: 'var(--ink)' }}>{folio}</span>.</p>
          </div>
          <button className="btn btn-primary btn-lg btn-block" onClick={finish} style={{ maxWidth: 360 }}>Continuar con el expediente <Icon name="arrowR" size={18} /></button>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { CheckLine, Identidad, Menores });
