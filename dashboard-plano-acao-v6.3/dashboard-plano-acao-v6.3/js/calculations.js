window.Calc={pv:m=>['rl','rp','ca','pd'].reduce((s,k)=>s+(Number(m[k])||0),0),pct:(a,b)=>b?Math.round(a/b*100):0,sum:(arr,key)=>arr.reduce((s,x)=>s+(Number(x[key])||0),0)};
