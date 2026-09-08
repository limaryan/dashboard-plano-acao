(()=>{
  const KEY='planoAcaoDashboardV2';
  const seed={
    monthlyTitle:'VISÃO GERAL',
    consolidatedTitle:'Panorama Consolidado de Execução',
    subtitle:'Acompanhamento do Plano de Ação',
    period:'Março a Agosto',
    date:'2026-09-04',
    monthlySectionTitle:'EVOLUÇÃO MENSAL',
    executionCardTitle:'EXECUÇÃO DO PLANO',
    plannedLabel:'AÇÕES PREVISTAS',
    realizedLabel:'AÇÕES REALIZADAS',
    consolidatedSectionTitle:'CONCLUSÃO POR SUPERINTENDÊNCIA',
    overviewLabel:'VISÃO GERAL',
    consolidatedHeading:'Execução consolidada de março a agosto',
    projectTotal:2316,
    realizedUntilPeriod:1009,
    categories:{
      rl:{code:'RL',name:'Realizadas'},
      rp:{code:'RP',name:'Reprogramadas'},
      ca:{code:'CA',name:'Canceladas'},
      pd:{code:'PD',name:'Pendentes'}
    },
    months:[['Março',103,14,0,37],['Abril',207,50,0,16],['Maio',244,105,106,15],['Junho',158,200,0,34],['Julho',125,153,10,47],['Agosto',98,96,0,59]].map(x=>({name:x[0],rl:x[1],rp:x[2],ca:x[3],pd:x[4]})),
    units:[['SG',74,36],['SAF',291,224],['SAS',1194,621],['SO',300,45],['SEPI',19,9]].map(x=>({name:x[0],planned:x[1],realized:x[2]}))
  };

  const clone=o=>JSON.parse(JSON.stringify(o));
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const $=s=>document.querySelector(s);
  const num=v=>Math.max(0,Number(v)||0);

  function normalize(raw={}){
    const s=clone(seed);
    Object.keys(s).forEach(k=>{if(raw[k]!==undefined && !['categories','months','units'].includes(k))s[k]=raw[k]});
    // Compatibilidade com JSON da versão 1
    if(raw.title && !raw.monthlyTitle)s.monthlyTitle=raw.title;
    if(Array.isArray(raw.months))s.months=raw.months.map(m=>({name:m.name||'Novo mês',rl:num(m.rl),rp:num(m.rp),ca:num(m.ca),pd:num(m.pd)}));
    if(Array.isArray(raw.units))s.units=raw.units.map(u=>({name:u.name||'Nova unidade',planned:num(u.planned),realized:num(u.realized)}));
    if(raw.categories){
      for(const k of ['rl','rp','ca','pd'])if(raw.categories[k])s.categories[k]={...s.categories[k],...raw.categories[k]};
    }
    return s;
  }

  let state;
  try{state=normalize(JSON.parse(localStorage.getItem(KEY))||{})}catch{state=clone(seed)}
  let view='mensal';

  function save(){localStorage.setItem(KEY,JSON.stringify(state))}
  function dateBR(v){if(!v)return'';const [y,m,d]=v.split('-');return y&&m&&d?`${d}/${m}/${y}`:v}
  function cat(k){return state.categories[k]||seed.categories[k]}
  function formula(){return `PV = ${['rl','rp','ca','pd'].map(k=>esc(cat(k).code)).join(' + ')}`}

  function renderEditors(){
    monthlyTitleInput.value=state.monthlyTitle;
    consolidatedTitleInput.value=state.consolidatedTitle;
    subtitleInput.value=state.subtitle;
    periodInput.value=state.period;
    dateInput.value=state.date;
    monthlySectionTitleInput.value=state.monthlySectionTitle;
    executionCardTitleInput.value=state.executionCardTitle;
    plannedLabelInput.value=state.plannedLabel;
    realizedLabelInput.value=state.realizedLabel;
    consolidatedSectionTitleInput.value=state.consolidatedSectionTitle;
    overviewLabelInput.value=state.overviewLabel;
    consolidatedHeadingInput.value=state.consolidatedHeading;
    projectTotal.value=state.projectTotal;
    realizedUntilPeriod.value=state.realizedUntilPeriod;

    categoryEditors.innerHTML=['rl','rp','ca','pd'].map(k=>`<div class="category-entry" data-cat="${k}"><span class="swatch ${k}"></span><label>Sigla<input data-k="code" maxlength="8" value="${esc(cat(k).code)}"></label><label>Nome<input data-k="name" value="${esc(cat(k).name)}"></label></div>`).join('');

    monthEditors.innerHTML=state.months.map((m,i)=>`<div class="entry" data-mi="${i}"><div class="entry-top"><input data-k="name" value="${esc(m.name)}"><button class="delete" data-del-month="${i}">Excluir</button></div><div class="grid-inputs">${['rl','rp','ca','pd'].map(k=>`<label>${esc(cat(k).code)}<input type="number" min="0" data-k="${k}" value="${m[k]}"></label>`).join('')}</div></div>`).join('');

    unitEditors.innerHTML=state.units.map((u,i)=>`<div class="entry" data-ui="${i}"><div class="entry-top"><input data-k="name" value="${esc(u.name)}"><button class="delete" data-del-unit="${i}">Excluir</button></div><div class="grid-inputs"><label>Previstas<input type="number" min="0" data-k="planned" value="${u.planned}"></label><label>Realizadas<input type="number" min="0" data-k="realized" value="${u.realized}"></label></div></div>`).join('');
  }

  function header(title){
    return `<header class="hero"><div><h1>◎ ${esc(title)}</h1><p>${esc(state.subtitle)}</p></div><div class="hero-right"><b>${esc(state.period)}</b><p>Atualizado em ${dateBR(state.date)}</p></div></header>`;
  }

  function monthly(){
    const planned=state.months.reduce((s,m)=>s+Calc.pv(m),0);
    const real=Calc.sum(state.months,'rl');
    const pct=Calc.pct(real,planned);
    const legend=['rl','rp','ca','pd'].map(k=>`<p><i class="dot ${k}"></i>${esc(cat(k).code)} — ${esc(cat(k).name)}</p>`).join('');
    return header(state.monthlyTitle)+`<div class="content">
      <div class="top-grid">
        <div class="card"><b>${esc(state.executionCardTitle)}</b>${UI.donut(pct)}</div>
        <div class="card metric"><div class="num">${planned.toLocaleString('pt-BR')}</div><small>${esc(state.plannedLabel)}</small></div>
        <div class="card metric green"><div class="num">${real.toLocaleString('pt-BR')}</div><small>${esc(state.realizedLabel)}</small></div>
        <div class="card legend"><b>LEGENDA</b>${legend}<hr><p>${formula()}</p></div>
      </div>
      <h2 class="section-title">${esc(state.monthlySectionTitle)}</h2>
      <div class="months">${state.months.map(m=>{
        const pv=Calc.pv(m);
        return `<div class="card month-card"><h3>${esc(m.name).toUpperCase()}</h3>${UI.statusDonut(m)}<div class="rows">${['rl','rp','ca','pd'].map(k=>UI.row(k,esc(cat(k).code),m[k],pv)).join('')}</div><div class="total"><span>TOTAL PREVISTO</span><span>${pv.toLocaleString('pt-BR')}</span></div></div>`
      }).join('')}</div>
    </div>`;
  }

  function consolidated(){
    const planned=Calc.sum(state.units,'planned');
    const real=Calc.sum(state.units,'realized');
    const pct=Calc.pct(real,planned);
    return header(state.consolidatedTitle)+`<div class="content">
      <div class="card consolidated">
        <div><b>${esc(state.overviewLabel)}</b>${UI.donut(pct,'CONCLUSÃO')}</div>
        <div><h2>${esc(state.consolidatedHeading)}</h2><div class="big-metrics">
          <div class="big-metric"><b>${planned.toLocaleString('pt-BR')}</b><p>ações previstas</p></div>
          <div class="big-metric green"><b>${real.toLocaleString('pt-BR')}</b><p>ações realizadas</p></div>
          <div class="big-metric"><b>${Number(state.projectTotal).toLocaleString('pt-BR')}</b><p>AÇÕES TOTAIS DO PROJETO</p></div>
          <div class="big-metric green"><b>${Number(state.realizedUntilPeriod).toLocaleString('pt-BR')}</b><p>REALIZADAS ATÉ O PERÍODO</p></div>
        </div></div>
      </div>
      <h2 class="section-title">${esc(state.consolidatedSectionTitle)}</h2>
      <div class="units">${state.units.map(u=>{const p=Calc.pct(u.realized,u.planned);return `<div class="card unit-card"><h2>${esc(u.name)}</h2>${UI.donut(p,'CONCLUSÃO')}<div class="done">${Number(u.realized).toLocaleString('pt-BR')}</div><span class="muted">ações realizadas</span><div class="total"><span>Previstas</span><span>${Number(u.planned).toLocaleString('pt-BR')}</span></div></div>`}).join('')}</div>
    </div>`;
  }

  function render(){dashboard.innerHTML=view==='mensal'?monthly():consolidated();save()}

  function bindText(id,key){$(id).addEventListener('input',e=>{state[key]=e.target.value;render()})}
  function bind(){
    bindText('#monthlyTitleInput','monthlyTitle');
    bindText('#consolidatedTitleInput','consolidatedTitle');
    bindText('#subtitleInput','subtitle');
    bindText('#periodInput','period');
    bindText('#dateInput','date');
    bindText('#monthlySectionTitleInput','monthlySectionTitle');
    bindText('#executionCardTitleInput','executionCardTitle');
    bindText('#plannedLabelInput','plannedLabel');
    bindText('#realizedLabelInput','realizedLabel');
    bindText('#consolidatedSectionTitleInput','consolidatedSectionTitle');
    bindText('#overviewLabelInput','overviewLabel');
    bindText('#consolidatedHeadingInput','consolidatedHeading');

    projectTotal.addEventListener('input',e=>{state.projectTotal=num(e.target.value);render()});
    realizedUntilPeriod.addEventListener('input',e=>{state.realizedUntilPeriod=num(e.target.value);render()});

    categoryEditors.addEventListener('input',e=>{
      const box=e.target.closest('[data-cat]');if(!box)return;
      const k=box.dataset.cat,field=e.target.dataset.k;if(!field)return;
      state.categories[k][field]=e.target.value;
      renderEditors();render();
      const focus=categoryEditors.querySelector(`[data-cat="${k}"] [data-k="${field}"]`);if(focus){focus.focus();focus.setSelectionRange(focus.value.length,focus.value.length)}
    });

    monthEditors.addEventListener('input',e=>{const box=e.target.closest('[data-mi]');if(!box)return;const k=e.target.dataset.k,i=+box.dataset.mi;state.months[i][k]=k==='name'?e.target.value:num(e.target.value);render()});
    unitEditors.addEventListener('input',e=>{const box=e.target.closest('[data-ui]');if(!box)return;const k=e.target.dataset.k,i=+box.dataset.ui;state.units[i][k]=k==='name'?e.target.value:num(e.target.value);render()});

    document.addEventListener('click',e=>{
      if(e.target.dataset.delMonth!==undefined){state.months.splice(+e.target.dataset.delMonth,1);renderEditors();render()}
      if(e.target.dataset.delUnit!==undefined){state.units.splice(+e.target.dataset.delUnit,1);renderEditors();render()}
    });

    addMonth.onclick=()=>{state.months.push({name:'Novo mês',rl:0,rp:0,ca:0,pd:0});renderEditors();render()};
    addUnit.onclick=()=>{state.units.push({name:'Nova unidade',planned:0,realized:0});renderEditors();render()};

    document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{
      view=b.dataset.view;
      document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('active',x===b));
      monthlyEditor.hidden=view!=='mensal';monthlyTextEditor.hidden=view!=='mensal';monthlyTitleLabel.hidden=view!=='mensal';
      unitEditor.hidden=view!=='consolidado';consolidatedTextEditor.hidden=view!=='consolidado';consolidatedTitleLabel.hidden=view!=='consolidado';
      render();
    });

    presentation.onclick=()=>{document.body.classList.add('presentation');const b=document.createElement('button');b.className='presentation-exit';b.textContent='Sair da apresentação';b.onclick=()=>{document.body.classList.remove('presentation');b.remove()};document.body.appendChild(b)};
    exportJson.onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='dados-dashboard-v2.json';a.click();URL.revokeObjectURL(a.href)};
    importJson.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{state=normalize(JSON.parse(r.result));renderEditors();render()}catch{alert('Arquivo JSON inválido.')}};r.readAsText(f)};
    reset.onclick=()=>{if(confirm('Restaurar os dados de exemplo?')){state=clone(seed);renderEditors();render()}};
  }

  renderEditors();bind();render();
})();
