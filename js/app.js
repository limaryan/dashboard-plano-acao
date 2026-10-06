(()=>{
  const KEY='planoAcaoDashboardV6';
  const monthNames=['Março','Abril','Maio','Junho','Julho','Agosto'];
  const emptyMonths=()=>monthNames.map(name=>({name,rl:0,rp:0,ca:0,pd:0}));
  const presentationGroupsSeed=()=>[
    {name:'Grupo 1',date:'2026-10-15',sectors:[
      ['NIR / NIRA','09:30','09:45'],['SPA','09:45','10:00'],['EMERGÊNCIA PED','10:00','10:15'],['TRIAGEM OBSTÉTRICA','10:15','10:30'],['4º CAM - GESTAÇÃO PATOLÓGICA','10:30','10:45'],['5º CAM - UI PUERPÉRIO/ ALOJ. CONJ.','10:30','10:45'],['6º CAM - GINECOLOGIA','10:30','10:45'],['CPN','10:45','11:00'],['COB','11:00','11:15'],['PRÉ-PARTO','11:15','11:30']
    ].map(([name,start,end])=>({name,start,end}))},
    {name:'Grupo 2',date:'2026-10-20',sectors:[
      ['UTI PED SIRAG','09:30','09:45'],['UTI CARDIO PED','09:45','10:00'],['UTI PED GERAL','10:00','10:15'],['UTI NEONATAL','10:15','10:30'],['FISIOTERAPIA','10:30','10:45'],['UTI ADULTO CIRURGICA','10:45','11:00'],['UTI ADULTO CLINICA','11:00','11:15']
    ].map(([name,start,end])=>({name,start,end}))},
    {name:'Grupo 3',date:'2026-10-23',sectors:[
      ['UI CLINICA MÉDICA','09:30','09:45'],['UI CLINICA CIRURGICA','09:45','10:00'],['3º, 4º HGP e UI PED SIRAG','10:00','10:15'],['2º HGP','10:15','10:30'],['UI CARDIO PED','10:30','10:45'],['UI CARDIO ADULTO','10:45','11:00'],['UI NEFRO HEPATO','11:00','11:15'],['TMO','11:15','11:30']
    ].map(([name,start,end])=>({name,start,end}))},
    {name:'Grupo 4',date:'2026-10-27',sectors:[
      ['CENTRO DE DIAGNÓSTICO POR IMAGEM','09:30','09:45'],['LABORATÓRIO DE ANÁLISES CLÍNICAS','09:45','10:00'],['CENTRO DE DIAGNÓSTICO','10:00','10:15'],['BANCO DE OLHOS','10:15','10:30'],['MEDICINA NUCLEAR','10:30','10:45'],['AG. TRANSFUSIONAL','10:45','11:00'],['ANATOMIA PATOLOGICA','11:00','11:15']
    ].map(([name,start,end])=>({name,start,end}))},
    {name:'Grupo 5',date:'2026-10-30',sectors:[
      ['BANCO DE LEITE','09:30','09:45'],['LACTÁRIO/ SONDÁRIO/ FRACIONAMENTO','09:45','10:00'],['NUTRIÇÃO CLÍNICA MATERNO, INFANTIL E ADULTO','10:00','10:15'],['UAN - UNIDADE DE ALIMENTAÇÃO E NUTRIÇÃO','10:15','10:30'],['FONOAUDIOLOGIA','10:30','10:45'],['ODONTOLOGIA','10:45','11:00'],['SERVIÇO SOCIAL','11:00','11:15'],['PSICOLOGIA','11:15','11:30']
    ].map(([name,start,end])=>({name,start,end}))},
    {name:'Grupo 6',date:'2026-11-03',sectors:[
      ['AMB. ONCO ADULTO','09:30','09:45'],['UI ONCO ADULTO','09:45','10:00'],['AMB. ONCO PED','10:00','10:15'],['UI ONCO PED','10:15','10:30'],['UTI ONCO PED','10:30','10:45'],['AMB. GERAL','10:45','11:00'],['CER IV','11:00','11:15']
    ].map(([name,start,end])=>({name,start,end}))},
    {name:'Grupo 7',date:'2026-11-06',sectors:[
      ['TERAPIA RENAL ADULTO','09:30','09:45'],['TERAPIA RENAL PED','09:45','10:00'],['UGT','10:00','10:15'],['HEMODINÂMICA','10:15','10:30'],['BLOCOS CIRURGICOS','10:30','10:45'],['CME','10:45','11:00']
    ].map(([name,start,end])=>({name,start,end}))},
    {name:'Grupo 8',date:'2026-11-10',sectors:[
      ['CENTRAL DE MAQUEIROS','09:30','09:45'],['GESTÃO DE TI','09:45','10:00'],['HOTELARIA','10:00','10:15'],['LAVANDERIA','10:15','10:30'],['HIGIENIZAÇÃO','10:30','10:45'],['FARMÁCIA','10:45','11:00'],['FARMÁCIA CLÍNICA','11:00','11:15'],['CAD - CENTRAL DE ABASTECIMENTO E DISTRIBUIÇÃO','11:15','11:30'],['COMPRAS','11:30','11:45'],['FATURAMENTO','11:45','12:00']
    ].map(([name,start,end])=>({name,start,end}))}
  ];
  const seed={
    monthlyTitle:'VISÃO GERAL', consolidatedTitle:'Panorama Consolidado de Execução', costTitle:'AÇÕES COM CUSTO — PLANO DE AÇÃO',
    subtitle:'Acompanhamento do Plano de Ação', period:'Março a Agosto', date:'2026-09-16',
    monthlySectionTitle:'EVOLUÇÃO MENSAL', executionCardTitle:'EXECUÇÃO DO PLANO', plannedLabel:'AÇÕES PREVISTAS', realizedLabel:'AÇÕES REALIZADAS',
    consolidatedSectionTitle:'CONCLUSÃO POR SUPERINTENDÊNCIA', overviewLabel:'VISÃO GERAL', consolidatedHeading:'Execução consolidada do período',
    costSectionTitle:'AÇÕES COM CUSTO POR SUPERINTENDÊNCIA',
    projectTotal:0, realizedUntilPeriod:0, costProjectTotal:0, costTotal:0, costCompleted:0,
    presentationTitle:'APRESENTAÇÃO DE RESULTADOS', presentationSubtitle:'Cronograma de apresentação dos resultados', automaticTitle:'Teste previstos', presentationGroups:presentationGroupsSeed(),
    categories:{rl:{code:'RL',name:'Realizadas'},rp:{code:'RP',name:'Reprogramadas'},ca:{code:'CA',name:'Canceladas'},pd:{code:'PD',name:'Pendentes'}},
    months:emptyMonths(),
    units:['SG','SAF','SAS','SO','SEPI'].map(name=>({name,planned:0,realized:0})),
    directors:['Renata','Afra','Felipe','Paulo'].map(name=>({name,months:emptyMonths()})),
    costUnits:['SG','SAF','SAS','SO','SEPI'].map(name=>({name,costActions:0,completed:0}))
  };
  const clone=o=>JSON.parse(JSON.stringify(o));
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const $=s=>document.querySelector(s);
  const num=v=>Math.max(0,Number(v)||0);
  function normalize(raw={}){
    const s=clone(seed);
    Object.keys(s).forEach(k=>{if(raw[k]!==undefined&&!['categories','months','units','directors','costUnits'].includes(k))s[k]=raw[k]});
    if(raw.title&&!raw.monthlyTitle)s.monthlyTitle=raw.title;
    if(Array.isArray(raw.months))s.months=raw.months.map(m=>({name:m.name||'Novo mês',rl:num(m.rl),rp:num(m.rp),ca:num(m.ca),pd:num(m.pd)}));
    if(Array.isArray(raw.units))s.units=raw.units.map(u=>({name:u.name||'Nova unidade',planned:num(u.planned),realized:num(u.realized)}));
    if(raw.categories)for(const k of ['rl','rp','ca','pd'])if(raw.categories[k])s.categories[k]={...s.categories[k],...raw.categories[k]};
    const baseNames=s.months.map(m=>m.name);
    if(Array.isArray(raw.directors))s.directors=raw.directors.map(d=>({name:d.name||'Nova diretoria',months:baseNames.map((name,i)=>{const old=(d.months||[])[i]||{};return {name,rl:num(old.rl),rp:num(old.rp),ca:num(old.ca),pd:num(old.pd)}})}));
    else s.directors=seed.directors.map(d=>({name:d.name,months:baseNames.map(name=>({name,rl:0,rp:0,ca:0,pd:0}))}));
    if(Array.isArray(raw.costUnits))s.costUnits=raw.costUnits.map(u=>({name:u.name||'Nova superintendência',costActions:num(u.costActions),completed:num(u.completed)}));
    if(Array.isArray(raw.presentationGroups))s.presentationGroups=raw.presentationGroups.map((g,i)=>({name:g.name||`Grupo ${i+1}`,date:g.date||'',sectors:Array.isArray(g.sectors)?g.sectors.map(x=>({name:x.name||'Novo setor',start:x.start||'',end:x.end||''})):[]}));
    if(raw.costTotal===undefined && Array.isArray(raw.costUnits))s.costTotal=Calc.sum(s.costUnits,'costActions');
    if(raw.costCompleted===undefined && Array.isArray(raw.costUnits))s.costCompleted=Calc.sum(s.costUnits,'completed');
    return s;
  }
  let state; try{const saved=localStorage.getItem(KEY)||localStorage.getItem('planoAcaoDashboardV5')||localStorage.getItem('planoAcaoDashboardV2');state=normalize(JSON.parse(saved)||{})}catch{state=clone(seed)}
  let view='mensal';
  let presentationEditing=false;
  let automaticRows=[];
  let automaticMeta={fileName:'',loadedAt:'',minDate:null,maxDate:null};
  function save(){localStorage.setItem(KEY,JSON.stringify(state))}
  function dateBR(v){if(!v)return'';const[y,m,d]=v.split('-');return y&&m&&d?`${d}/${m}/${y}`:v}
  function cat(k){return state.categories[k]||seed.categories[k]}
  function formula(){return `PV = ${['rl','rp','ca','pd'].map(k=>esc(cat(k).code)).join(' + ')}`}
  function syncDirectorMonths(){state.directors.forEach(d=>{const old=d.months||[];d.months=state.months.map((m,i)=>{const x=old[i]||{};return {name:m.name,rl:num(x.rl),rp:num(x.rp),ca:num(x.ca),pd:num(x.pd)}})})}

  function normalizeHeader(v){return String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]+/g,' ').trim().toLowerCase()}
  function parseBRDate(v){
    if(v===null||v===undefined||v==='')return null;
    if(v instanceof Date&&!isNaN(v))return new Date(v.getFullYear(),v.getMonth(),v.getDate(),12);
    if(typeof v==='number'&&isFinite(v)){
      // Excel serial date (1900 date system). The subtraction also accounts for Excel's fake 29/02/1900.
      const d=new Date(Math.round((v-25569)*86400000));
      if(!isNaN(d))return new Date(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate(),12);
    }
    const s=String(v).trim(); if(!s||s==='-')return null;
    const clean=s.split(/[T ]/)[0].trim();
    let m=clean.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{1,4})$/);
    if(!m){
      // Also accept ISO dates coming from some XLSX readers.
      m=clean.match(/^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})$/);
      if(m){const y=Number(m[1]),mo=Number(m[2]),day=Number(m[3]);const d=new Date(y,mo-1,day,12);return d.getFullYear()===y&&d.getMonth()===mo-1&&d.getDate()===day?d:null;}
      return null;
    }
    let day=Number(m[1]),mo=Number(m[2]),y=Number(m[3]);
    // A few exported rows contain years such as 0026. Treat 2/3 digit years as 2000-based
    // so the row remains auditable instead of disappearing from the period calculation.
    if(y<100)y+=2000; else if(y<1900)y+=2000;
    const d=new Date(y,mo-1,day,12);
    return d.getFullYear()===y&&d.getMonth()===mo-1&&d.getDate()===day?d:null;
  }
  function isoDate(d){return d?`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`:''}
  function brDate(d){return d?`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`:''}
  function endOfMonth(y,m){return new Date(y,m,0,12)}
  function getAutomaticPeriod(){
    const mode=$('#autoPeriodMode')?.value||'month';
    if(mode==='year'){const y=Number($('#autoYear')?.value)||2026;return {start:new Date(y,0,1,12),end:new Date(y,11,31,12),label:String(y)}}
    if(mode==='custom'){const a=parseBRDate($('#autoStart')?.value);const b=parseBRDate($('#autoEnd')?.value);return {start:a||new Date(2026,2,1,12),end:b||new Date(2026,2,31,12),label:`${brDate(a||new Date(2026,2,1,12))} a ${brDate(b||new Date(2026,2,31,12))}`}}
    const raw=$('#autoMonth')?.value||'2026-03';const [y,m]=raw.split('-').map(Number);const start=new Date(y,m-1,1,12);return {start,end:endOfMonth(y,m),label:start.toLocaleDateString('pt-BR',{month:'long',year:'numeric'})};
  }
  function classifyAutomatic(row,start,end){
    const prazo=row.prazo; if(!prazo||prazo<start||prazo>end)return null;
    const status=normalizeHeader(row.status);
    if(status.includes('cancelada'))return 'ca';
    // Realizada only when the source marks the action as concluded and the real date
    // confirms completion by the end of the selected period. Early completion counts.
    const concluded=status.includes('acao concluida')||status.includes('concluido apos reprogramacao');
    if(concluded&&row.real&&row.real<=end)return 'rl';
    if(row.reprog)return 'rp';
    return 'pd';
  }
  function automaticFilteredRows(){
    const p=getAutomaticPeriod(); const sup=$('#autoSuper')?.value||'__ALL__';
    return automaticRows.filter(r=>r.prazo&&r.prazo>=p.start&&r.prazo<=p.end).map(r=>({...r,classification:classifyAutomatic(r,p.start,p.end)})).filter(r=>sup==='__ALL__'||r.supers.includes(sup));
  }
  function automaticCounts(rows){return rows.reduce((a,r)=>(a[r.classification]++,a),{rl:0,rp:0,ca:0,pd:0})}
  function automaticSuperNames(){const set=new Set();automaticRows.forEach(r=>r.supers.forEach(x=>set.add(x)));return [...set].sort((a,b)=>a.localeCompare(b,'pt-BR'))}
  function refreshAutomaticControls(){
    const sup=$('#autoSuper'), year=$('#autoYear'); if(!sup||!year)return;
    const currentSup=sup.value, currentYear=year.value;
    sup.innerHTML='<option value="__ALL__">Todas</option>'+automaticSuperNames().map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join(''); if([...sup.options].some(o=>o.value===currentSup))sup.value=currentSup;
    const years=new Set(); automaticRows.forEach(r=>{if(r.prazo)years.add(r.prazo.getFullYear())}); const ys=[...years].sort((a,b)=>a-b); year.innerHTML=ys.map(y=>`<option value="${y}">${y}</option>`).join(''); if(ys.includes(Number(currentYear)))year.value=currentYear; else if(ys.length)year.value=ys[0];
    const min=automaticRows.reduce((v,r)=>r.prazo&&(!v||r.prazo<v)?r.prazo:v,null), max=automaticRows.reduce((v,r)=>r.prazo&&(!v||r.prazo>v)?r.prazo:v,null); automaticMeta.minDate=min;automaticMeta.maxDate=max;
    if(min&&max){$('#autoMonth').min=`${min.getFullYear()}-${String(min.getMonth()+1).padStart(2,'0')}`;$('#autoMonth').max=`${max.getFullYear()}-${String(max.getMonth()+1).padStart(2,'0')}`;$('#autoStart').min=isoDate(min);$('#autoStart').max=isoDate(max);$('#autoEnd').min=isoDate(min);$('#autoEnd').max=isoDate(max)}
    const invalid=automaticMeta.invalidPrazo||0;
    $('#automaticFileStatus').textContent=automaticRows.length?`✓ ${automaticRows.length.toLocaleString('pt-BR')} ações carregadas • ${automaticMeta.fileName}${invalid?` • ${invalid} sem Prazo válido`:''}`:'Nenhuma planilha carregada.';
  }
  function syncAutomaticModeControls(){
    const mode=$('#autoPeriodMode')?.value||'month';$('#autoMonthWrap').hidden=mode!=='month';$('#autoYearWrap').hidden=mode!=='year';$('#autoStartWrap').hidden=mode!=='custom';$('#autoEndWrap').hidden=mode!=='custom';
  }
  function automaticDashboard(){
    const p=getAutomaticPeriod(); const rows=automaticFilteredRows(); const c=automaticCounts(rows); const pv=rows.length; const pct=pv?Calc.pct(c.rl,pv):null;
    const selectedStatus=$('#autoStatus')?.value||'__ALL__'; const detailRows=selectedStatus==='__ALL__'?rows:rows.filter(r=>r.classification===selectedStatus);
    const supNames=automaticSuperNames();
    const bySup=supNames.map(sup=>{const sr=rows.filter(r=>r.supers.includes(sup));const sc=automaticCounts(sr);const sp=sr.length;return {sup,...sc,pv:sp,pct:sp?Calc.pct(sc.rl,sp):null}}).filter(x=>x.pv);
    const statusLabel={rl:'Realizadas',rp:'Reprogramadas',pd:'Pendentes',ca:'Canceladas'};
    const reconciliation=c.rl+c.rp+c.ca+c.pd;
    const audit=automaticMeta.invalidPrazo||0;
    return `<div class="automatic-report"><header class="hero"><div><h1>${esc(state.automaticTitle||'Teste previstos')}</h1><p>Leitura automática do Plano de Ação</p></div><div class="hero-right"><b>${esc(p.label)}</b><p>${automaticRows.length?esc(automaticMeta.fileName):'Importe a planilha para iniciar'}</p></div></header><div class="content"><div class="automatic-summary"><div class="card auto-kpi"><span>PREVISTAS</span><b>${pv.toLocaleString('pt-BR')}</b></div><div class="card auto-kpi green"><span>REALIZADAS</span><b>${c.rl.toLocaleString('pt-BR')}</b></div><div class="card auto-kpi blue"><span>REPROGRAMADAS</span><b>${c.rp.toLocaleString('pt-BR')}</b></div><div class="card auto-kpi red"><span>PENDENTES</span><b>${c.pd.toLocaleString('pt-BR')}</b></div><div class="card auto-kpi yellow"><span>CANCELADAS</span><b>${c.ca.toLocaleString('pt-BR')}</b></div><div class="card auto-execution"><span>EXECUÇÃO</span>${UI.donut(pct,'CONCLUSÃO')}</div></div><div class="automatic-audit"><b>CONFERÊNCIA DO PERÍODO</b><span>${pv.toLocaleString('pt-BR')} ações selecionadas pelo <strong>Prazo original</strong></span><span>${reconciliation.toLocaleString('pt-BR')} ações classificadas</span><span class="${reconciliation===pv?'audit-ok':'audit-warn'}">${reconciliation===pv?'✓ Fechamento: OK':'⚠ Verificar classificação'}</span>${audit?`<span class="audit-warn">${audit} linha(s) sem Prazo válido foram mantidas fora dos períodos.</span>`:''}</div><h2 class="section-title">POR SUPERINTENDÊNCIA</h2><div class="automatic-super-table"><div class="auto-table-row auto-table-head"><b>SUPERINTENDÊNCIA</b><b>PREVISTAS</b><b>REALIZADAS</b><b>REPROGRAM.</b><b>PENDENTES</b><b>CANCELADAS</b><b>EXECUÇÃO</b></div>${bySup.map(x=>`<div class="auto-table-row"><span>${esc(x.sup)}</span><b>${x.pv}</b><b class="green-text">${x.rl}</b><b class="blue-text">${x.rp}</b><b class="red-text">${x.pd}</b><b class="yellow-text">${x.ca}</b><b>${x.pct===null?'N/A':x.pct+'%'}</b></div>`).join('')}</div><p class="muted auto-note">O período é definido exclusivamente pelo <b>Prazo original</b> da ação. Reprogramação, Data Real e Status são usados somente para classificar as ações já selecionadas. Conclusões antecipadas continuam pertencendo ao mês do Prazo original. Ações compartilhadas entre superintendências aparecem em cada superintendência, mas no total geral são contadas uma única vez.</p><h2 class="section-title">AÇÕES DO PERÍODO <span class="auto-detail-count">${detailRows.length.toLocaleString('pt-BR')} registros</span></h2><div class="automatic-detail"><div class="auto-table-row auto-table-head"><b>CÓDIGO</b><b>SUPERINTENDÊNCIA</b><b>PRAZO</b><b>REPROGRAMAÇÃO</b><b>DATA REAL</b><b>SITUAÇÃO</b></div>${detailRows.map(r=>`<div class="auto-table-row"><span>${esc(r.codigo)}</span><span>${esc(r.supers.join(', '))}</span><span>${brDate(r.prazo)}</span><span>${brDate(r.reprog)||'—'}</span><span>${brDate(r.real)||'—'}</span><b class="${r.classification}-text">${statusLabel[r.classification]}</b></div>`).join('')}</div></div></div>`;
  }
  function findHeaderRow(table){
    const rows=[...table.querySelectorAll('tr')];
    const wanted=['codigo','superintendencia','superveniencia','prazo','reprogramacao','data real','status'];
    for(let i=0;i<Math.min(rows.length,25);i++){
      const cells=[...rows[i].querySelectorAll('th,td')].map(c=>normalizeHeader(c.textContent));
      const hits=wanted.filter(w=>cells.includes(w)).length;
      if(hits>=5)return {index:i,cells};
    }
    return null;
  }
  function htmlTableToObjects(text){
    const doc=new DOMParser().parseFromString(text,'text/html');
    const table=doc.querySelector('table'); if(!table)throw new Error('Arquivo HTML sem tabela.');
    const info=findHeaderRow(table); if(!info)throw new Error('Não foi possível localizar o cabeçalho da planilha.');
    const rows=[...table.querySelectorAll('tr')].slice(info.index+1);
    const headers=info.cells;
    return rows.map(tr=>{const cells=[...tr.querySelectorAll('th,td')].map(c=>c.textContent.trim());const obj={};headers.forEach((h,i)=>obj[h||`coluna_${i}`]=cells[i]??'');return obj;}).filter(r=>Object.values(r).some(v=>String(v).trim()!==''));
  }
  async function importAutomaticFile(file){
    if(!file)return;
    try{
      if(typeof XLSX==='undefined')throw new Error('Biblioteca Excel indisponível.');
      const buf=await file.arrayBuffer(); let raw=[];
      const probeUtf= new TextDecoder('utf-8').decode(buf.slice(0,4096));
      const probe1252= new TextDecoder('windows-1252').decode(buf.slice(0,4096));
      const htmlProbe=/<(?:html|table|!doctype)\b/i.test(probeUtf)||/<(?:html|table|!doctype)\b/i.test(probe1252);
      if(htmlProbe){
        // The current .xls export is actually UTF-8 HTML. Parse the table directly so no
        // SheetJS header/date coercion can silently drop rows.
        const text=new TextDecoder('utf-8').decode(buf);
        raw=htmlTableToObjects(text);
      }else{
        const isCsv=/\.csv$/i.test(file.name)||/^text\/csv/i.test(file.type||'');
        const wb=XLSX.read(buf,{type:'array',cellDates:true,raw:true,codepage:65001});
        const ws=wb.Sheets[wb.SheetNames[0]]; raw=XLSX.utils.sheet_to_json(ws,{defval:'',raw:true,blankrows:false});
        if(!raw.length&&isCsv)throw new Error('O CSV não possui linhas de dados.');
      }
      if(!raw.length)throw new Error('A planilha não possui linhas de dados.');
      const headers=Object.keys(raw[0]);
      const find=(names,fallback)=>{const wanted=names.map(normalizeHeader);const found=headers.find(h=>wanted.includes(normalizeHeader(h)));return found??headers[fallback]};
      const cols={codigo:find(['Código','Codigo'],0),sup:find(['Superintendência','Superintendencia','Superveniência','Superveniencia'],5),prazo:find(['Prazo','Prazo final original','Prazo final'],10),reprog:find(['Reprogramação','Reprogramacao'],11),real:find(['Data Real','Data de Realização','Data de Realizacao'],12),status:find(['Status','Situação','Situacao'],13)};
      if(!cols.sup||!cols.prazo||!cols.reprog||!cols.real||!cols.status)throw new Error('Não foi possível localizar as colunas de Superintendência e K:N da planilha.');
      const mapped=raw.map((r,i)=>{const supText=String(r[cols.sup]??'').trim();return {codigo:String(r[cols.codigo]??i+1).trim(),supers:supText.split(/[,;]+/).map(x=>x.trim().toUpperCase()).filter(Boolean),prazo:parseBRDate(r[cols.prazo]),reprog:parseBRDate(r[cols.reprog]),real:parseBRDate(r[cols.real]),status:String(r[cols.status]??'').trim()}});
      const invalidPrazo=mapped.filter(r=>!r.prazo).length;
      automaticRows=mapped.filter(r=>r.prazo);
      automaticMeta.fileName=file.name;automaticMeta.loadedAt=new Date().toISOString();automaticMeta.rawCount=mapped.length;automaticMeta.invalidPrazo=invalidPrazo;
      refreshAutomaticControls();render();
    }catch(err){alert(`Não foi possível ler a planilha.\n\n${err.message||err}`)}
  }
  function renderEditors(){
    monthlyTitleInput.value=state.monthlyTitle; consolidatedTitleInput.value=state.consolidatedTitle; costTitleInput.value=state.costTitle;
    subtitleInput.value=state.subtitle; periodInput.value=state.period; dateInput.value=state.date;
    monthlySectionTitleInput.value=state.monthlySectionTitle; executionCardTitleInput.value=state.executionCardTitle; plannedLabelInput.value=state.plannedLabel; realizedLabelInput.value=state.realizedLabel;
    consolidatedSectionTitleInput.value=state.consolidatedSectionTitle; overviewLabelInput.value=state.overviewLabel; consolidatedHeadingInput.value=state.consolidatedHeading;
    costSectionTitleInput.value=state.costSectionTitle; projectTotal.value=state.projectTotal; realizedUntilPeriod.value=state.realizedUntilPeriod; costProjectTotal.value=state.costProjectTotal; costTotal.value=state.costTotal; costCompleted.value=state.costCompleted;
    presentationTitleInput.value=state.presentationTitle; presentationSubtitleInput.value=state.presentationSubtitle;
    if(typeof automaticTitleInput!=='undefined' && automaticTitleInput) automaticTitleInput.value=state.automaticTitle||'Teste previstos';
    categoryEditors.innerHTML=['rl','rp','ca','pd'].map(k=>`<div class="category-entry" data-cat="${k}"><span class="swatch ${k}"></span><label>Sigla<input data-k="code" maxlength="8" value="${esc(cat(k).code)}"></label><label>Nome<input data-k="name" value="${esc(cat(k).name)}"></label></div>`).join('');
    monthEditors.innerHTML=state.months.map((m,i)=>`<div class="entry" data-mi="${i}"><div class="entry-top"><input data-k="name" value="${esc(m.name)}"><button class="delete" data-del-month="${i}" type="button">Excluir</button></div><div class="grid-inputs">${['rl','rp','ca','pd'].map(k=>`<label>${esc(cat(k).code)}<input type="number" min="0" data-k="${k}" value="${m[k]}"></label>`).join('')}</div></div>`).join('');
    unitEditors.innerHTML=state.units.map((u,i)=>`<div class="entry" data-ui="${i}"><div class="entry-top"><input data-k="name" value="${esc(u.name)}"><button class="delete" data-del-unit="${i}" type="button">Excluir</button></div><div class="grid-inputs"><label>Previstas<input type="number" min="0" data-k="planned" value="${u.planned}"></label><label>Realizadas<input type="number" min="0" data-k="realized" value="${u.realized}"></label></div></div>`).join('');
    directorEditors.innerHTML=state.directors.map((d,di)=>`<div class="entry director-entry" data-di="${di}"><div class="entry-top"><input class="director-name" data-k="name" value="${esc(d.name)}"><button class="delete" data-del-director="${di}" type="button">Excluir</button></div><div class="director-month-inputs">${d.months.map((m,mi)=>`<div class="director-month-edit" data-dmi="${mi}"><b>${esc(m.name)}</b><div class="grid-inputs">${['rl','rp','ca','pd'].map(k=>`<label>${esc(cat(k).code)}<input type="number" min="0" data-k="${k}" value="${m[k]}"></label>`).join('')}</div></div>`).join('')}</div></div>`).join('');
    costUnitEditors.innerHTML=state.costUnits.map((u,i)=>`<div class="entry" data-cui="${i}"><div class="entry-top"><input data-k="name" value="${esc(u.name)}"><button class="delete" data-del-cost-unit="${i}" type="button">Excluir</button></div><div class="grid-inputs"><label>Ações com custo<input type="number" min="0" data-k="costActions" value="${u.costActions}"></label><label>Concluídas<input type="number" min="0" data-k="completed" value="${u.completed}"></label></div></div>`).join('');
    presentationGroupEditors.innerHTML=state.presentationGroups.map((g,gi)=>`<div class="entry presentation-group-edit" data-pgi="${gi}"><div class="entry-top"><div class="presentation-group-fields"><label>Nome do grupo<input data-pk="name" value="${esc(g.name)}"></label><label>Dia da apresentação<input type="date" data-pk="date" value="${esc(g.date)}"></label></div><div class="reorder"><button type="button" data-pg-up="${gi}" title="Mover grupo para cima">↑</button><button type="button" data-pg-down="${gi}" title="Mover grupo para baixo">↓</button></div><button class="delete" data-del-pgroup="${gi}" type="button">Excluir grupo</button></div><div class="editor-group-caption">${g.sectors.length} setor${g.sectors.length===1?'':'es'} • Edite o nome, horário e grupo diretamente abaixo.</div><div class="presentation-sector-table-head"><span>SETOR</span><span>HORÁRIO</span><span>GRUPO / DIA</span><span>AÇÕES</span></div><div class="presentation-sector-editors">${g.sectors.map((x,si)=>`<div class="sector-edit" data-pgi="${gi}" data-si="${si}"><label class="sector-name-field"><span>Setor</span><input data-sk="name" value="${esc(x.name)}" placeholder="Nome do setor"></label><label class="sector-time-field"><span>Horário</span><div class="time-pair"><input type="time" data-sk="start" value="${esc(x.start)}" title="Horário inicial" min="09:30" step="900"><b>–</b><input type="time" data-sk="end" value="${esc(x.end)}" title="Horário final" min="09:45" step="900"></div></label><label class="sector-move-field"><span>Grupo / Dia</span><select data-sk="move" title="Mover setor para outro grupo">${state.presentationGroups.map((target,ti)=>`<option value="${ti}" ${ti===gi?'selected':''}>${esc(target.name)} — ${dateBR(target.date)||'sem data'}</option>`).join('')}</select></label><div class="sector-actions"><div class="reorder"><button type="button" data-ps-up="${gi}:${si}" title="Mover setor para cima">↑</button><button type="button" data-ps-down="${gi}:${si}" title="Mover setor para baixo">↓</button></div><button class="delete" type="button" data-del-psector="${gi}:${si}">Excluir</button></div></div>`).join('')}</div><div class="add-sector-box"><label><span>Novo setor</span><input type="text" data-new-sector-name="${gi}" placeholder="Digite o nome do setor"></label><button class="add-inline" type="button" data-add-psector="${gi}">+ Adicionar setor</button><small>O horário será criado automaticamente em intervalos de 15 minutos.</small></div></div>`).join('');
  }

  function header(title){return `<header class="hero"><div><h1>${esc(title)}</h1><p>${esc(state.subtitle)}</p></div><div class="hero-right"><b>${esc(state.period)}</b><p>Atualizado em ${dateBR(state.date)}</p></div></header>`}
  function monthly(){
    const planned=state.months.reduce((s,m)=>s+Calc.pv(m),0),real=Calc.sum(state.months,'rl'),pct=planned?Calc.pct(real,planned):null;
    const legend=['rl','rp','ca','pd'].map(k=>`<p><i class="dot ${k}"></i>${esc(cat(k).code)} — ${esc(cat(k).name)}</p>`).join('');
    return header(state.monthlyTitle)+`<div class="content"><div class="top-grid"><div class="card"><b>${esc(state.executionCardTitle)}</b>${UI.donut(pct)}</div><div class="card metric"><div class="num">${planned.toLocaleString('pt-BR')}</div><small>${esc(state.plannedLabel)}</small></div><div class="card metric green"><div class="num">${real.toLocaleString('pt-BR')}</div><small>${esc(state.realizedLabel)}</small></div><div class="card legend"><b>LEGENDA</b>${legend}<hr><p>${formula()}</p></div></div><h2 class="section-title">${esc(state.monthlySectionTitle)}</h2><div class="months">${state.months.map(m=>{const pv=Calc.pv(m);return `<div class="card month-card"><h3>${esc(m.name).toUpperCase()}</h3>${UI.statusDonut(m)}<div class="rows">${['rl','rp','ca','pd'].map(k=>UI.row(k,esc(cat(k).code),m[k],pv)).join('')}</div><div class="total"><span>TOTAL PREVISTO</span><span>${pv.toLocaleString('pt-BR')}</span></div></div>`}).join('')}</div></div>`
  }
  function consolidated(){
    const planned=Calc.sum(state.units,'planned'),real=Calc.sum(state.units,'realized'),pct=planned?Calc.pct(real,planned):null;
    return header(state.consolidatedTitle)+`<div class="content"><div class="card consolidated"><div><b>${esc(state.overviewLabel)}</b>${UI.donut(pct,'CONCLUSÃO')}</div><div><h2>${esc(state.consolidatedHeading)}</h2><div class="big-metrics"><div class="big-metric"><b>${planned.toLocaleString('pt-BR')}</b><p>ações previstas</p></div><div class="big-metric green"><b>${real.toLocaleString('pt-BR')}</b><p>ações realizadas</p></div><div class="big-metric"><b>${Number(state.projectTotal).toLocaleString('pt-BR')}</b><p>AÇÕES TOTAIS DO PROJETO</p></div><div class="big-metric green"><b>${Number(state.realizedUntilPeriod).toLocaleString('pt-BR')}</b><p>REALIZADAS ATÉ O PERÍODO</p></div></div></div></div><h2 class="section-title">${esc(state.consolidatedSectionTitle)}</h2><div class="units">${state.units.map(u=>{const p=u.planned?Calc.pct(u.realized,u.planned):null;return `<div class="card unit-card"><h2>${esc(u.name)}</h2>${UI.donut(p,'CONCLUSÃO')}<div class="done">${Number(u.realized).toLocaleString('pt-BR')}</div><span class="muted">ações realizadas</span><div class="total"><span>Previstas</span><span>${Number(u.planned).toLocaleString('pt-BR')}</span></div></div>`}).join('')}</div></div>`
  }
  function sgMonthCard(m,small=false){const pv=Calc.pv(m);return `<div class="card ${small?'sg-mini-month':'sg-main-month'}"><h3>${esc(m.name).toUpperCase()}</h3>${UI.statusDonut(m)}<div class="rows">${['rl','rp','ca','pd'].map(k=>UI.row(k,esc(cat(k).code),m[k],pv)).join('')}</div><div class="total"><span>PV</span><span>${pv.toLocaleString('pt-BR')}</span></div></div>`}
  function sgDiretoria(){return header('SG — ACOMPANHAMENTO DO PLANO DE AÇÃO')+`<div class="content sg-content"><h2 class="section-title sg-general-title">SG GERAL — EVOLUÇÃO MENSAL</h2><div class="sg-general-months">${state.months.map(m=>sgMonthCard(m,false)).join('')}</div><h2 class="section-title sg-directors-title">ESTRATIFICADO POR DIRETORIA</h2><div class="director-sections">${state.directors.map(d=>`<section class="card director-section"><h2>${esc(d.name).toUpperCase()}</h2><div class="director-months">${d.months.map(m=>sgMonthCard(m,true)).join('')}</div></section>`).join('')}</div></div>`}
  function costDashboard(){
    const totalCost=num(state.costTotal), completed=num(state.costCompleted), pct=totalCost?Calc.pct(completed,totalCost):null;
    return header(state.costTitle)+`<div class="content"><div class="cost-summary"><div class="card cost-kpi"><span>AÇÕES TOTAIS DO PLANO</span><b>${Number(state.costProjectTotal).toLocaleString('pt-BR')}</b></div><div class="card cost-kpi"><span>AÇÕES COM CUSTO</span><b>${totalCost.toLocaleString('pt-BR')}</b></div><div class="card cost-kpi green"><span>CONCLUÍDAS COM CUSTO</span><b>${completed.toLocaleString('pt-BR')}</b></div><div class="card cost-donut-card"><span>EXECUÇÃO DAS AÇÕES COM CUSTO</span>${UI.donut(pct,'CONCLUSÃO','SEM AÇÕES COM CUSTO')}</div></div><h2 class="section-title">${esc(state.costSectionTitle)}</h2><div class="cost-units">${state.costUnits.map(u=>{const p=u.costActions?Calc.pct(u.completed,u.costActions):null;return `<div class="card cost-unit-card"><h2>${esc(u.name)}</h2>${UI.donut(p,'CONCLUSÃO','SEM AÇÕES COM CUSTO')}<div class="cost-pair"><div><b>${Number(u.costActions).toLocaleString('pt-BR')}</b><span>Ações com custo</span></div><div class="green"><b>${Number(u.completed).toLocaleString('pt-BR')}</b><span>Concluídas</span></div></div></div>`}).join('')}</div></div>`
  }

  function presentationDashboard(){
    return `<div class="presentation-report" id="presentationReport"><div class="presentation-report-head"><div><h1>${esc(state.presentationTitle)}</h1><p>${esc(state.presentationSubtitle)}</p></div><div class="presentation-report-meta"><b>${state.presentationGroups.length} grupos</b><span>Atualizado em ${dateBR(state.date)}</span><div class="presentation-report-actions"><button class="presentation-edit-btn" type="button" data-presentation-edit="1">Editar</button><button class="presentation-png-btn" type="button" data-export-png="1">Baixar PNG</button></div></div></div><div class="presentation-grid">${state.presentationGroups.map((g,gi)=>`<section class="presentation-group-card"><div class="presentation-group-head"><div><h2>${esc(g.name).toUpperCase()}</h2><strong>${dateBR(g.date)}</strong></div><span>GRUPO ${gi+1}</span></div><div class="presentation-table-head"><span>SETORES</span><span>HORÁRIO</span></div><div class="presentation-rows">${g.sectors.map(x=>`<div class="presentation-row"><span>${esc(x.name)}</span><b>${esc(x.start)} - ${esc(x.end)}</b></div>`).join('')}</div></section>`).join('')}</div></div>`;
  }
  function render(){dashboard.innerHTML=view==='mensal'?monthly():view==='consolidado'?consolidated():view==='sgdiretoria'?sgDiretoria():view==='custos'?costDashboard():view==='apresentacao'?presentationDashboard():automaticDashboard();save()}
  function bindText(id,key){$(id).addEventListener('input',e=>{state[key]=e.target.value;render()})}

  async function exportPresentationPNG(){
    if(view!=='apresentacao')return;
    const errors=[];
    state.presentationGroups.forEach((g,gi)=>{
      if(!g.date)errors.push(`Grupo ${gi+1}: informe a data.`);
      if(!g.sectors.length)errors.push(`Grupo ${gi+1}: adicione pelo menos um setor.`);
      g.sectors.forEach((x,si)=>{
        if(!x.name.trim())errors.push(`Grupo ${gi+1}, setor ${si+1}: informe o nome.`);
        if(!x.start||!x.end)errors.push(`Grupo ${gi+1}, setor ${si+1}: informe os dois horários.`);
        if(x.start&&x.end&&x.end<x.start)errors.push(`Grupo ${gi+1}, setor ${si+1}: o horário final não pode ser anterior ao inicial.`);
      });
    });
    if(errors.length){alert('Corrija antes de exportar o PNG:\n\n'+errors.join('\n'));return}
    if(typeof html2canvas==='undefined'){alert('Não foi possível carregar o exportador PNG. Verifique sua conexão e tente novamente.');return}
    const source=document.getElementById('presentationReport');
    if(!source)return;
    const clone=source.cloneNode(true);
    clone.removeAttribute('id');
    clone.classList.add('png-export-sheet');
    clone.querySelectorAll('.presentation-report-actions').forEach(el=>el.remove());
    const host=document.createElement('div');
    host.className='png-export-host';
    host.appendChild(clone);
    document.body.appendChild(host);
    try{
      const canvas=await html2canvas(clone,{backgroundColor:'#fff',scale:2,useCORS:true,logging:false,width:794,height:1123,windowWidth:794});
      const a=document.createElement('a');
      a.download='apresentacao-de-resultados.png';
      a.href=canvas.toDataURL('image/png');
      a.click();
    }finally{host.remove()}
  }

  function exportExcelFile(){
    if(typeof XLSX==='undefined'){alert('Não foi possível carregar o gerador de Excel. Verifique sua conexão e tente novamente.');return}
    const wb=XLSX.utils.book_new();
    const addSheet=(name,rows,widths)=>{const ws=XLSX.utils.aoa_to_sheet(rows);ws['!cols']=widths.map(w=>({wch:w}));if(rows.length>1)ws['!autofilter']={ref:`A1:${XLSX.utils.encode_col(rows[0].length-1)}${rows.length}`};XLSX.utils.book_append_sheet(wb,ws,name)};
    addSheet('Resumo',[
      ['Indicador','Valor'],['Período',state.period],['Atualizado em',dateBR(state.date)],['Ações totais do projeto',state.projectTotal],['Realizadas até o período',state.realizedUntilPeriod],['Ações totais do plano - custo',state.costProjectTotal],['Ações com custo',state.costTotal],['Concluídas com custo',state.costCompleted]
    ],[32,20]);
    addSheet('Visao Geral',[['Mês','PV','RL','RP','CA','PD','Execução %'],...state.months.map(m=>{const pv=Calc.pv(m);return [m.name,pv,m.rl,m.rp,m.ca,m.pd,pv?Calc.pct(m.rl,pv):'N/A']})],[18,10,10,10,10,10,12]);
    addSheet('Consolidado',[['Superintendência / Diretoria','Previstas','Realizadas','Conclusão %'],...state.units.map(u=>[u.name,u.planned,u.realized,u.planned?Calc.pct(u.realized,u.planned):'N/A'])],[28,14,14,14]);
    const dirRows=[['Diretoria','Mês','PV','RL','RP','CA','PD','Execução %']];state.directors.forEach(d=>d.months.forEach(m=>{const pv=Calc.pv(m);dirRows.push([d.name,m.name,pv,m.rl,m.rp,m.ca,m.pd,pv?Calc.pct(m.rl,pv):'N/A'])}));addSheet('SG Diretorias',dirRows,[20,16,10,10,10,10,10,12]);
    addSheet('Acoes com Custo',[['Superintendência','Ações com custo','Concluídas','Conclusão %'],...state.costUnits.map(u=>[u.name,u.costActions,u.completed,u.costActions?Calc.pct(u.completed,u.costActions):'N/A'])],[24,18,16,14]);
    const pRows=[['Grupo','Data','Setor','Início','Fim']];state.presentationGroups.forEach(g=>g.sectors.forEach(x=>pRows.push([g.name,dateBR(g.date),x.name,x.start,x.end])));addSheet('Apresentacao',pRows,[16,14,52,12,12]);
    const d=state.date||new Date().toISOString().slice(0,10);XLSX.writeFile(wb,`Dashboard_Plano_de_Acao_${d}.xlsx`);
  }

  function exportAutomaticExcel(){
    if(!automaticRows.length){alert('Importe uma planilha primeiro.');return}
    if(typeof XLSX==='undefined'){alert('Não foi possível carregar o gerador de Excel.');return}
    const p=getAutomaticPeriod(), rows=automaticFilteredRows(), selectedStatus=$('#autoStatus')?.value||'__ALL__';
    const detail=selectedStatus==='__ALL__'?rows:rows.filter(r=>r.classification===selectedStatus); const c=automaticCounts(rows), pv=c.rl+c.rp+c.ca+c.pd;
    const wb=XLSX.utils.book_new(); const statusLabel={rl:'Realizada',rp:'Reprogramada',pd:'Pendente',ca:'Cancelada'};
    const summary=[['Teste previstos'],['Período',p.label],['Arquivo',automaticMeta.fileName],['Previstas',pv],['Realizadas',c.rl],['Reprogramadas',c.rp],['Pendentes',c.pd],['Canceladas',c.ca],['Execução %',pv?Calc.pct(c.rl,pv):'N/A']];
    XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(summary),'Resumo');
    const data=[['Código','Superintendência','Prazo','Reprogramação','Data Real','Situação']]; detail.forEach(r=>data.push([r.codigo,r.supers.join(', '),brDate(r.prazo),brDate(r.reprog)||'—',brDate(r.real)||'—',statusLabel[r.classification]]));
    XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(data),'Acoes filtradas');
    XLSX.writeFile(wb,`Teste_previstos_${isoDate(p.start)}_${isoDate(p.end)}.xlsx`);
  }

  function zeroValues(){
    state.projectTotal=0; state.realizedUntilPeriod=0; state.costProjectTotal=0; state.costTotal=0; state.costCompleted=0;
    state.months.forEach(m=>{m.rl=m.rp=m.ca=m.pd=0});
    state.units.forEach(u=>{u.planned=u.realized=0});
    state.directors.forEach(d=>d.months.forEach(m=>{m.rl=m.rp=m.ca=m.pd=0}));
    state.costUnits.forEach(u=>{u.costActions=u.completed=0});
  }

  function renderPresentationControls(){
    const isP=view==='apresentacao'; const isA=view==='testePrevistos';
    const editorHeading=document.querySelector('.editor-topbar h1');
    const editorSub=document.querySelector('.editor-topbar .muted');
    if(editorHeading) editorHeading.textContent=isP&&presentationEditing?'Editar Apresentação de Resultados':isA?'Teste previstos':'Gerador de Relatório';
    if(editorSub) editorSub.textContent=isP&&presentationEditing?'Altere grupos, dias, setores e horários. Salve para voltar à visualização.':isA?'Importe a planilha e filtre o período para testar os cálculos automáticos.':'Edite textos e dados; o dashboard atualiza automaticamente.';
    monthlyEditor.hidden=!(!isP && view==='mensal');
    monthlyTextEditor.hidden=!(!isP && view==='mensal');
    monthlyTitleLabel.hidden=!(!isP && view==='mensal');
    unitEditor.hidden=!(view==='consolidado');
    consolidatedTextEditor.hidden=!(view==='consolidado');
    consolidatedTitleLabel.hidden=!(view==='consolidado');
    directorEditor.hidden=!(view==='sgdiretoria');
    costEditor.hidden=!(view==='custos');
    costTextEditor.hidden=!(view==='custos');
    costTitleLabel.hidden=!(view==='custos');
    const showPEdit=isP&&presentationEditing;
    presentationEditor.hidden=!showPEdit;
    presentationTextEditor.hidden=!showPEdit;
    automaticEditor.hidden=!isA;
    automaticTextEditor.hidden=!isA;
    commonHeaderEditor.hidden=isP||isA;
    categoryEditorBlock.hidden=isP||isA;
    if(isP&&!presentationEditing) document.body.classList.add('sidebar-collapsed');
    if(isP&&presentationEditing) document.body.classList.remove('sidebar-collapsed');
    if(isA) document.body.classList.remove('sidebar-collapsed');
    if(isP&&!presentationEditing){
      presentationTitleInput.value=state.presentationTitle;
      presentationSubtitleInput.value=state.presentationSubtitle;
    }
  }

  function bind(){
    bindText('#monthlyTitleInput','monthlyTitle');bindText('#consolidatedTitleInput','consolidatedTitle');bindText('#automaticTitleInput','automaticTitle');bindText('#costTitleInput','costTitle');bindText('#presentationTitleInput','presentationTitle');bindText('#presentationSubtitleInput','presentationSubtitle');bindText('#subtitleInput','subtitle');bindText('#periodInput','period');bindText('#dateInput','date');bindText('#monthlySectionTitleInput','monthlySectionTitle');bindText('#executionCardTitleInput','executionCardTitle');bindText('#plannedLabelInput','plannedLabel');bindText('#realizedLabelInput','realizedLabel');bindText('#consolidatedSectionTitleInput','consolidatedSectionTitle');bindText('#overviewLabelInput','overviewLabel');bindText('#consolidatedHeadingInput','consolidatedHeading');bindText('#costSectionTitleInput','costSectionTitle');
    projectTotal.addEventListener('input',e=>{state.projectTotal=num(e.target.value);render()});realizedUntilPeriod.addEventListener('input',e=>{state.realizedUntilPeriod=num(e.target.value);render()});costProjectTotal.addEventListener('input',e=>{state.costProjectTotal=num(e.target.value);render()});costTotal.addEventListener('input',e=>{state.costTotal=num(e.target.value);render()});costCompleted.addEventListener('input',e=>{state.costCompleted=num(e.target.value);render()});
    categoryEditors.addEventListener('input',e=>{const box=e.target.closest('[data-cat]');if(!box)return;const k=box.dataset.cat,field=e.target.dataset.k;if(!field)return;state.categories[k][field]=e.target.value;renderEditors();render()});
    monthEditors.addEventListener('input',e=>{const box=e.target.closest('[data-mi]');if(!box)return;const k=e.target.dataset.k,i=+box.dataset.mi;state.months[i][k]=k==='name'?e.target.value:num(e.target.value);if(k==='name')syncDirectorMonths();render()});
    unitEditors.addEventListener('input',e=>{const box=e.target.closest('[data-ui]');if(!box)return;const k=e.target.dataset.k,i=+box.dataset.ui;state.units[i][k]=k==='name'?e.target.value:num(e.target.value);render()});
    directorEditors.addEventListener('input',e=>{const box=e.target.closest('[data-di]');if(!box)return;const di=+box.dataset.di,k=e.target.dataset.k;if(k==='name'){state.directors[di].name=e.target.value;render();return}const mb=e.target.closest('[data-dmi]');if(mb&&k){state.directors[di].months[+mb.dataset.dmi][k]=num(e.target.value);render()}});
    costUnitEditors.addEventListener('input',e=>{const box=e.target.closest('[data-cui]');if(!box)return;const i=+box.dataset.cui,k=e.target.dataset.k;if(!k)return;state.costUnits[i][k]=k==='name'?e.target.value:num(e.target.value);render()});
    presentationGroupEditors.addEventListener('input',e=>{const group=e.target.closest('[data-pgi]');if(!group)return;const gi=+group.dataset.pgi;if(e.target.dataset.pk){state.presentationGroups[gi][e.target.dataset.pk]=e.target.value;save();return}const sector=e.target.closest('[data-si]');if(sector&&e.target.dataset.sk&&e.target.dataset.sk!=='move'){const si=+sector.dataset.si;state.presentationGroups[gi].sectors[si][e.target.dataset.sk]=e.target.value;save()}});
    presentationGroupEditors.addEventListener('change',e=>{const sector=e.target.closest('[data-si]');if(!sector||e.target.dataset.sk!=='move')return;const [gi,si]=[+sector.dataset.pgi,+sector.dataset.si];const target=+e.target.value;if(target===gi)return;const item=state.presentationGroups[gi].sectors.splice(si,1)[0];state.presentationGroups[target].sectors.push(item);save();renderEditors();render()});
    $('#actionPlanFile').addEventListener('change',e=>importAutomaticFile(e.target.files[0]));
    ['autoPeriodMode','autoMonth','autoYear','autoStart','autoEnd','autoSuper','autoStatus'].forEach(id=>{const el=$('#'+id);if(el)el.addEventListener('change',()=>{if(id==='autoPeriodMode')syncAutomaticModeControls();render()})});
    $('#autoExportExcel').onclick=()=>exportAutomaticExcel();
    $('#autoPrint').onclick=()=>window.print();
    syncAutomaticModeControls();
    savePresentation.onclick=()=>{save();presentationEditing=false;renderPresentationControls();document.body.classList.add('sidebar-collapsed');render()};
    document.addEventListener('click',e=>{
      if(e.target.dataset.exportPng!==undefined){exportPresentationPNG();return}
      if(e.target.dataset.presentationEdit!==undefined){presentationEditing=true;renderPresentationControls();document.body.classList.remove('sidebar-collapsed');renderEditors();render();const ed=document.querySelector('.editor');if(ed)ed.scrollTo({top:0,behavior:'smooth'});return}
      if(e.target.dataset.delMonth!==undefined){state.months.splice(+e.target.dataset.delMonth,1);syncDirectorMonths();renderEditors();render()}
      if(e.target.dataset.delUnit!==undefined){state.units.splice(+e.target.dataset.delUnit,1);renderEditors();render()}
      if(e.target.dataset.delDirector!==undefined){state.directors.splice(+e.target.dataset.delDirector,1);renderEditors();render()}
      if(e.target.dataset.delCostUnit!==undefined){state.costUnits.splice(+e.target.dataset.delCostUnit,1);renderEditors();render()}
      if(e.target.dataset.delPgroup!==undefined){state.presentationGroups.splice(+e.target.dataset.delPgroup,1);renderEditors();render()}
      if(e.target.dataset.addPsector!==undefined){const gi=+e.target.dataset.addPsector;const g=state.presentationGroups[gi];const input=document.querySelector(`[data-new-sector-name=\"${gi}\"]`);const name=(input?.value||'').trim();if(!name){alert('Digite o nome do setor antes de adicionar.');input?.focus();return}const toMinutes=t=>{if(!t||!/^[0-9]{2}:[0-9]{2}$/.test(t))return null;const [h,m]=t.split(':').map(Number);return h*60+m};const fromMinutes=m=>`${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;let next=9*60+30;g.sectors.forEach(x=>{const end=toMinutes(x.end);if(end!==null&&end>next)next=end});const start=fromMinutes(next),end=fromMinutes(next+15);g.sectors.push({name,start,end});save();renderEditors();render()}
      if(e.target.dataset.delPsector){const [gi,si]=e.target.dataset.delPsector.split(':').map(Number);state.presentationGroups[gi].sectors.splice(si,1);renderEditors();render()}
      if(e.target.dataset.pgUp!==undefined){const i=+e.target.dataset.pgUp;if(i>0){[state.presentationGroups[i-1],state.presentationGroups[i]]=[state.presentationGroups[i],state.presentationGroups[i-1]];renderEditors();render()}}
      if(e.target.dataset.pgDown!==undefined){const i=+e.target.dataset.pgDown;if(i<state.presentationGroups.length-1){[state.presentationGroups[i+1],state.presentationGroups[i]]=[state.presentationGroups[i],state.presentationGroups[i+1]];renderEditors();render()}}
      if(e.target.dataset.psUp){const [gi,si]=e.target.dataset.psUp.split(':').map(Number);if(si>0){const a=state.presentationGroups[gi].sectors;[a[si-1],a[si]]=[a[si],a[si-1]];renderEditors();render()}}
      if(e.target.dataset.psDown){const [gi,si]=e.target.dataset.psDown.split(':').map(Number);const a=state.presentationGroups[gi].sectors;if(si<a.length-1){[a[si+1],a[si]]=[a[si],a[si+1]];renderEditors();render()}}
    });
    addMonth.onclick=()=>{state.months.push({name:'Novo mês',rl:0,rp:0,ca:0,pd:0});syncDirectorMonths();renderEditors();render()};
    addUnit.onclick=()=>{state.units.push({name:'Nova unidade',planned:0,realized:0});renderEditors();render()};
    addDirector.onclick=()=>{state.directors.push({name:'Nova diretoria',months:state.months.map(m=>({name:m.name,rl:0,rp:0,ca:0,pd:0}))});renderEditors();render()};
    addCostUnit.onclick=()=>{state.costUnits.push({name:'Nova superintendência',costActions:0,completed:0});renderEditors();render()};
    addPresentationGroup.onclick=()=>{state.presentationGroups.push({name:`Grupo ${state.presentationGroups.length+1}`,date:'',sectors:[]});renderEditors();render()};
    document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{
      view=b.dataset.view;
      if(view==='apresentacao')presentationEditing=false;
      document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('active',x===b));
      renderPresentationControls();
      render();
    });
    presentation.onclick=()=>{document.body.classList.add('presentation');const b=document.createElement('button');b.className='presentation-exit';b.textContent='Sair da apresentação';b.onclick=()=>{document.body.classList.remove('presentation');b.remove()};document.body.appendChild(b)};
    exportExcel.onclick=exportExcelFile;
    printReport.onclick=()=>{
      if(view==='apresentacao'){
        const errors=[];
        state.presentationGroups.forEach((g,gi)=>{
          if(!g.date)errors.push(`Grupo ${gi+1}: informe a data.`);
          if(!g.sectors.length)errors.push(`Grupo ${gi+1}: adicione pelo menos um setor.`);
          g.sectors.forEach((x,si)=>{
            if(!x.name.trim())errors.push(`Grupo ${gi+1}, setor ${si+1}: informe o nome.`);
            if(!x.start||!x.end)errors.push(`Grupo ${gi+1}, setor ${si+1}: informe os dois horários.`);
            if(x.start&&x.end&&x.end<x.start)errors.push(`Grupo ${gi+1}, setor ${si+1}: o horário final não pode ser anterior ao inicial.`);
          });
        });
        if(errors.length){alert('Corrija antes de imprimir:\n\n'+errors.join('\n'));return}
      }
      window.print();
    };
    exportJson.onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='dados-dashboard-v6.4.json';a.click();URL.revokeObjectURL(a.href)};
    importJson.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{state=normalize(JSON.parse(r.result));renderEditors();render()}catch{alert('Arquivo JSON inválido.')}};r.readAsText(f)};
    reset.onclick=()=>{if(confirm('Zerar todos os valores numéricos? Meses, nomes, diretorias, superintendências e textos serão mantidos.')){zeroValues();renderEditors();render()}};
    const setSidebar=collapsed=>document.body.classList.toggle('sidebar-collapsed',collapsed);
    collapseSidebar.onclick=()=>setSidebar(true); openSidebar.onclick=()=>setSidebar(false);
  }
  renderEditors();bind();renderPresentationControls();refreshAutomaticControls();render();
})();
