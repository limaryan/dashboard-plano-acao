window.UI={
  donut:(pct,label='EXECUÇÃO')=>`<div class="donut" style="--p:${Math.max(0,Math.min(100,pct))}"><div class="donut-center"><b>${pct}%</b><span>${label}</span></div></div>`,
  statusDonut:(m,label='EXECUÇÃO')=>{
    const total=window.Calc.pv(m);
    const pct=window.Calc.pct(m.rl,total);
    const vals=['rl','rp','ca','pd'].map(k=>total?Math.max(0,Number(m[k])||0)/total*100:0);
    let acc=0;
    const colors=['var(--green)','var(--blue)','var(--yellow)','var(--red)'];
    const stops=[];
    vals.forEach((v,i)=>{const start=acc;acc+=v;if(v>0)stops.push(`${colors[i]} ${start}% ${acc}%`)});
    const bg=stops.length?stops.join(','):'var(--gray) 0 100%';
    return `<div class="donut status-donut" style="background:conic-gradient(${bg})"><div class="donut-center"><b>${pct}%</b><span>${label}</span></div></div>`;
  },
  row:(cls,name,n,total)=>`<div class="row"><span><i class="dot ${cls}"></i>${name}</span><span>${Number(n).toLocaleString('pt-BR')}</span><span>${total?Math.round((Number(n)||0)/total*100):0}%</span></div>`
};
