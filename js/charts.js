window.UI={
  donut:(pct,label='EXECUÇÃO',naLabel='SEM AÇÕES PREVISTAS')=>{
    const valid=Number.isFinite(Number(pct));
    const p=valid?Math.max(0,Math.min(100,Number(pct))):0;
    return `<div class="donut${valid?'':' na'}" style="--p:${p}"><div class="donut-center"><b>${valid?Math.round(p)+'%':'N/A'}</b><span>${valid?label:naLabel}</span></div></div>`;
  },
  statusDonut:(m,label='EXECUÇÃO')=>{
    const total=window.Calc.pv(m);
    const pct=total>0?window.Calc.pct(m.rl,total):null;
    const vals=['rl','rp','ca','pd'].map(k=>total?Math.max(0,Number(m[k])||0)/total*100:0);
    let acc=0;
    const colors=['var(--green)','var(--blue)','var(--yellow)','var(--red)'];
    const stops=[];
    vals.forEach((v,i)=>{const start=acc;acc+=v;if(v>0)stops.push(`${colors[i]} ${start}% ${acc}%`)});
    const bg=stops.length?stops.join(','):'var(--gray) 0 100%';
    if(!total)return `<div class="donut status-donut na" style="background:var(--gray)"><div class="donut-center"><b>N/A</b><span>SEM AÇÕES PREVISTAS NO MÊS</span></div></div>`;
    return `<div class="donut status-donut" style="background:conic-gradient(${bg})"><div class="donut-center"><b>${pct}%</b><span>${label}</span></div></div>`;
  },
  row:(cls,name,n,total)=>`<div class="row"><span><i class="dot ${cls}"></i>${name}</span><span>${Number(n).toLocaleString('pt-BR')}</span><span>${total?Math.round((Number(n)||0)/total*100)+'%':'N/A'}</span></div>`
};
