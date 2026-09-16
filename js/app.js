(()=>{
  const KEY='planoAcaoDashboardV5';
  const monthNames=['Março','Abril','Maio','Junho','Julho','Agosto'];
  const emptyMonths=()=>monthNames.map(name=>({name,rl:0,rp:0,ca:0,pd:0}));
  const seed={
    monthlyTitle:'VISÃO GERAL', consolidatedTitle:'Panorama Consolidado de Execução', costTitle:'AÇÕES COM CUSTO — PLANO DE AÇÃO',
    subtitle:'Acompanhamento do Plano de Ação', period:'Março a Agosto', date:'2026-09-16',
    monthlySectionTitle:'EVOLUÇÃO MENSAL', executionCardTitle:'EXECUÇÃO DO PLANO', plannedLabel:'AÇÕES PREVISTAS', realizedLabel:'AÇÕES REALIZADAS',
    consolidatedSectionTitle:'CONCLUSÃO POR SUPERINTENDÊNCIA', overviewLabel:'VISÃO GERAL', consolidatedHeading:'Execução consolidada do período',
    costSectionTitle:'AÇÕES COM CUSTO POR SUPERINTENDÊNCIA',
    projectTotal:0, realizedUntilPeriod:0, costProjectTotal:0,
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
    return s;
  }
  let state; try{const saved=localStorage.getItem(KEY)||localStorage.getItem('planoAcaoDashboardV2');state=normalize(JSON.parse(saved)||{})}catch{state=clone(seed)}
  let view='mensal';
  function save(){localStorage.setItem(KEY,JSON.stringify(state))}
  function dateBR(v){if(!v)return'';const[y,m,d]=v.split('-');return y&&m&&d?`${d}/${m}/${y}`:v}
  function cat(k){return state.categories[k]||seed.categories[k]}
  function formula(){return `PV = ${['rl','rp','ca','pd'].map(k=>esc(cat(k).code)).join(' + ')}`}
  function syncDirectorMonths(){state.directors.forEach(d=>{const old=d.months||[];d.months=state.months.map((m,i)=>{const x=old[i]||{};return {name:m.name,rl:num(x.rl),rp:num(x.rp),ca:num(x.ca),pd:num(x.pd)}})})}

  function renderEditors(){
    monthlyTitleInput.value=state.monthlyTitle; consolidatedTitleInput.value=state.consolidatedTitle; costTitleInput.value=state.costTitle;
    subtitleInput.value=state.subtitle; periodInput.value=state.period; dateInput.value=state.date;
    monthlySectionTitleInput.value=state.monthlySectionTitle; executionCardTitleInput.value=state.executionCardTitle; plannedLabelInput.value=state.plannedLabel; realizedLabelInput.value=state.realizedLabel;
    consolidatedSectionTitleInput.value=state.consolidatedSectionTitle; overviewLabelInput.value=state.overviewLabel; consolidatedHeadingInput.value=state.consolidatedHeading;
    costSectionTitleInput.value=state.costSectionTitle; projectTotal.value=state.projectTotal; realizedUntilPeriod.value=state.realizedUntilPeriod; costProjectTotal.value=state.costProjectTotal;
    categoryEditors.innerHTML=['rl','rp','ca','pd'].map(k=>`<div class="category-entry" data-cat="${k}"><span class="swatch ${k}"></span><label>Sigla<input data-k="code" maxlength="8" value="${esc(cat(k).code)}"></label><label>Nome<input data-k="name" value="${esc(cat(k).name)}"></label></div>`).join('');
    monthEditors.innerHTML=state.months.map((m,i)=>`<div class="entry" data-mi="${i}"><div class="entry-top"><input data-k="name" value="${esc(m.name)}"><button class="delete" data-del-month="${i}" type="button">Excluir</button></div><div class="grid-inputs">${['rl','rp','ca','pd'].map(k=>`<label>${esc(cat(k).code)}<input type="number" min="0" data-k="${k}" value="${m[k]}"></label>`).join('')}</div></div>`).join('');
    unitEditors.innerHTML=state.units.map((u,i)=>`<div class="entry" data-ui="${i}"><div class="entry-top"><input data-k="name" value="${esc(u.name)}"><button class="delete" data-del-unit="${i}" type="button">Excluir</button></div><div class="grid-inputs"><label>Previstas<input type="number" min="0" data-k="planned" value="${u.planned}"></label><label>Realizadas<input type="number" min="0" data-k="realized" value="${u.realized}"></label></div></div>`).join('');
    directorEditors.innerHTML=state.directors.map((d,di)=>`<div class="entry director-entry" data-di="${di}"><div class="entry-top"><input class="director-name" data-k="name" value="${esc(d.name)}"><button class="delete" data-del-director="${di}" type="button">Excluir</button></div><div class="director-month-inputs">${d.months.map((m,mi)=>`<div class="director-month-edit" data-dmi="${mi}"><b>${esc(m.name)}</b><div class="grid-inputs">${['rl','rp','ca','pd'].map(k=>`<label>${esc(cat(k).code)}<input type="number" min="0" data-k="${k}" value="${m[k]}"></label>`).join('')}</div></div>`).join('')}</div></div>`).join('');
    costUnitEditors.innerHTML=state.costUnits.map((u,i)=>`<div class="entry" data-cui="${i}"><div class="entry-top"><input data-k="name" value="${esc(u.name)}"><button class="delete" data-del-cost-unit="${i}" type="button">Excluir</button></div><div class="grid-inputs"><label>Ações com custo<input type="number" min="0" data-k="costActions" value="${u.costActions}"></label><label>Concluídas<input type="number" min="0" data-k="completed" value="${u.completed}"></label></div></div>`).join('');
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
    const totalCost=Calc.sum(state.costUnits,'costActions'), completed=Calc.sum(state.costUnits,'completed'), pct=totalCost?Calc.pct(completed,totalCost):null;
    return header(state.costTitle)+`<div class="content"><div class="cost-summary"><div class="card cost-kpi"><span>AÇÕES TOTAIS DO PLANO</span><b>${Number(state.costProjectTotal).toLocaleString('pt-BR')}</b><small>valor manual</small></div><div class="card cost-kpi"><span>AÇÕES COM CUSTO</span><b>${totalCost.toLocaleString('pt-BR')}</b><small>soma das superintendências</small></div><div class="card cost-kpi green"><span>CONCLUÍDAS COM CUSTO</span><b>${completed.toLocaleString('pt-BR')}</b><small>soma das superintendências</small></div><div class="card cost-donut-card"><span>EXECUÇÃO DAS AÇÕES COM CUSTO</span>${UI.donut(pct,'CONCLUSÃO','SEM AÇÕES COM CUSTO')}</div></div><h2 class="section-title">${esc(state.costSectionTitle)}</h2><div class="cost-units">${state.costUnits.map(u=>{const p=u.costActions?Calc.pct(u.completed,u.costActions):null;return `<div class="card cost-unit-card"><h2>${esc(u.name)}</h2>${UI.donut(p,'CONCLUSÃO','SEM AÇÕES COM CUSTO')}<div class="cost-pair"><div><b>${Number(u.costActions).toLocaleString('pt-BR')}</b><span>Ações com custo</span></div><div class="green"><b>${Number(u.completed).toLocaleString('pt-BR')}</b><span>Concluídas</span></div></div></div>`}).join('')}</div></div>`
  }

  function render(){dashboard.innerHTML=view==='mensal'?monthly():view==='consolidado'?consolidated():view==='sgdiretoria'?sgDiretoria():costDashboard();save()}
  function bindText(id,key){$(id).addEventListener('input',e=>{state[key]=e.target.value;render()})}

  function exportExcelFile(){
    if(typeof XLSX==='undefined'){alert('Não foi possível carregar o gerador de Excel. Verifique sua conexão e tente novamente.');return}
    const wb=XLSX.utils.book_new();
    const addSheet=(name,rows,widths)=>{const ws=XLSX.utils.aoa_to_sheet(rows);ws['!cols']=widths.map(w=>({wch:w}));if(rows.length>1)ws['!autofilter']={ref:`A1:${XLSX.utils.encode_col(rows[0].length-1)}${rows.length}`};XLSX.utils.book_append_sheet(wb,ws,name)};
    addSheet('Resumo',[
      ['Indicador','Valor'],['Período',state.period],['Atualizado em',dateBR(state.date)],['Ações totais do projeto',state.projectTotal],['Realizadas até o período',state.realizedUntilPeriod],['Ações totais do plano - custo',state.costProjectTotal],['Ações com custo',Calc.sum(state.costUnits,'costActions')],['Concluídas com custo',Calc.sum(state.costUnits,'completed')]
    ],[32,20]);
    addSheet('Visao Geral',[['Mês','PV','RL','RP','CA','PD','Execução %'],...state.months.map(m=>{const pv=Calc.pv(m);return [m.name,pv,m.rl,m.rp,m.ca,m.pd,pv?Calc.pct(m.rl,pv):'N/A']})],[18,10,10,10,10,10,12]);
    addSheet('Consolidado',[['Superintendência / Diretoria','Previstas','Realizadas','Conclusão %'],...state.units.map(u=>[u.name,u.planned,u.realized,u.planned?Calc.pct(u.realized,u.planned):'N/A'])],[28,14,14,14]);
    const dirRows=[['Diretoria','Mês','PV','RL','RP','CA','PD','Execução %']];state.directors.forEach(d=>d.months.forEach(m=>{const pv=Calc.pv(m);dirRows.push([d.name,m.name,pv,m.rl,m.rp,m.ca,m.pd,pv?Calc.pct(m.rl,pv):'N/A'])}));addSheet('SG Diretorias',dirRows,[20,16,10,10,10,10,10,12]);
    addSheet('Acoes com Custo',[['Superintendência','Ações com custo','Concluídas','Conclusão %'],...state.costUnits.map(u=>[u.name,u.costActions,u.completed,u.costActions?Calc.pct(u.completed,u.costActions):'N/A'])],[24,18,16,14]);
    const d=state.date||new Date().toISOString().slice(0,10);XLSX.writeFile(wb,`Dashboard_Plano_de_Acao_${d}.xlsx`);
  }

  function zeroValues(){
    state.projectTotal=0; state.realizedUntilPeriod=0; state.costProjectTotal=0;
    state.months.forEach(m=>{m.rl=m.rp=m.ca=m.pd=0});
    state.units.forEach(u=>{u.planned=u.realized=0});
    state.directors.forEach(d=>d.months.forEach(m=>{m.rl=m.rp=m.ca=m.pd=0}));
    state.costUnits.forEach(u=>{u.costActions=u.completed=0});
  }

  function bind(){
    bindText('#monthlyTitleInput','monthlyTitle');bindText('#consolidatedTitleInput','consolidatedTitle');bindText('#costTitleInput','costTitle');bindText('#subtitleInput','subtitle');bindText('#periodInput','period');bindText('#dateInput','date');bindText('#monthlySectionTitleInput','monthlySectionTitle');bindText('#executionCardTitleInput','executionCardTitle');bindText('#plannedLabelInput','plannedLabel');bindText('#realizedLabelInput','realizedLabel');bindText('#consolidatedSectionTitleInput','consolidatedSectionTitle');bindText('#overviewLabelInput','overviewLabel');bindText('#consolidatedHeadingInput','consolidatedHeading');bindText('#costSectionTitleInput','costSectionTitle');
    projectTotal.addEventListener('input',e=>{state.projectTotal=num(e.target.value);render()});realizedUntilPeriod.addEventListener('input',e=>{state.realizedUntilPeriod=num(e.target.value);render()});costProjectTotal.addEventListener('input',e=>{state.costProjectTotal=num(e.target.value);render()});
    categoryEditors.addEventListener('input',e=>{const box=e.target.closest('[data-cat]');if(!box)return;const k=box.dataset.cat,field=e.target.dataset.k;if(!field)return;state.categories[k][field]=e.target.value;renderEditors();render()});
    monthEditors.addEventListener('input',e=>{const box=e.target.closest('[data-mi]');if(!box)return;const k=e.target.dataset.k,i=+box.dataset.mi;state.months[i][k]=k==='name'?e.target.value:num(e.target.value);if(k==='name')syncDirectorMonths();render()});
    unitEditors.addEventListener('input',e=>{const box=e.target.closest('[data-ui]');if(!box)return;const k=e.target.dataset.k,i=+box.dataset.ui;state.units[i][k]=k==='name'?e.target.value:num(e.target.value);render()});
    directorEditors.addEventListener('input',e=>{const box=e.target.closest('[data-di]');if(!box)return;const di=+box.dataset.di,k=e.target.dataset.k;if(k==='name'){state.directors[di].name=e.target.value;render();return}const mb=e.target.closest('[data-dmi]');if(mb&&k){state.directors[di].months[+mb.dataset.dmi][k]=num(e.target.value);render()}});
    costUnitEditors.addEventListener('input',e=>{const box=e.target.closest('[data-cui]');if(!box)return;const i=+box.dataset.cui,k=e.target.dataset.k;if(!k)return;state.costUnits[i][k]=k==='name'?e.target.value:num(e.target.value);render()});
    document.addEventListener('click',e=>{
      if(e.target.dataset.delMonth!==undefined){state.months.splice(+e.target.dataset.delMonth,1);syncDirectorMonths();renderEditors();render()}
      if(e.target.dataset.delUnit!==undefined){state.units.splice(+e.target.dataset.delUnit,1);renderEditors();render()}
      if(e.target.dataset.delDirector!==undefined){state.directors.splice(+e.target.dataset.delDirector,1);renderEditors();render()}
      if(e.target.dataset.delCostUnit!==undefined){state.costUnits.splice(+e.target.dataset.delCostUnit,1);renderEditors();render()}
    });
    addMonth.onclick=()=>{state.months.push({name:'Novo mês',rl:0,rp:0,ca:0,pd:0});syncDirectorMonths();renderEditors();render()};
    addUnit.onclick=()=>{state.units.push({name:'Nova unidade',planned:0,realized:0});renderEditors();render()};
    addDirector.onclick=()=>{state.directors.push({name:'Nova diretoria',months:state.months.map(m=>({name:m.name,rl:0,rp:0,ca:0,pd:0}))});renderEditors();render()};
    addCostUnit.onclick=()=>{state.costUnits.push({name:'Nova superintendência',costActions:0,completed:0});renderEditors();render()};
    document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{
      view=b.dataset.view;document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('active',x===b));
      const isM=view==='mensal',isC=view==='consolidado',isD=view==='sgdiretoria',isCost=view==='custos';
      monthlyEditor.hidden=!isM;monthlyTextEditor.hidden=!isM;monthlyTitleLabel.hidden=!isM;
      unitEditor.hidden=!isC;consolidatedTextEditor.hidden=!isC;consolidatedTitleLabel.hidden=!isC;
      directorEditor.hidden=!isD;
      costEditor.hidden=!isCost;costTextEditor.hidden=!isCost;costTitleLabel.hidden=!isCost;
      render();
    });
    presentation.onclick=()=>{document.body.classList.add('presentation');const b=document.createElement('button');b.className='presentation-exit';b.textContent='Sair da apresentação';b.onclick=()=>{document.body.classList.remove('presentation');b.remove()};document.body.appendChild(b)};
    exportExcel.onclick=exportExcelFile;
    exportJson.onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='dados-dashboard-v5.json';a.click();URL.revokeObjectURL(a.href)};
    importJson.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{state=normalize(JSON.parse(r.result));renderEditors();render()}catch{alert('Arquivo JSON inválido.')}};r.readAsText(f)};
    reset.onclick=()=>{if(confirm('Zerar todos os valores numéricos? Meses, nomes, diretorias, superintendências e textos serão mantidos.')){zeroValues();renderEditors();render()}};
    const setSidebar=collapsed=>document.body.classList.toggle('sidebar-collapsed',collapsed);
    collapseSidebar.onclick=()=>setSidebar(true); openSidebar.onclick=()=>setSidebar(false);
  }
  renderEditors();bind();render();
})();
