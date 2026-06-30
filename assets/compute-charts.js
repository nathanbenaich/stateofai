(function(){
 if(typeof Chart==='undefined'){return;}
 Chart.defaults.font.family="'PT Sans', sans-serif";
 Chart.defaults.font.size=13;
 Chart.defaults.color='#161E59';
 if(Chart.defaults.plugins&&Chart.defaults.plugins.tooltip){
   var tip=Chart.defaults.plugins.tooltip;
   tip.enabled=false;
   tip.external=externalTooltip;
   tip.bodyFont={size:13,lineHeight:1.25};
   tip.titleFont={size:14,weight:'bold',lineHeight:1.25};
   tip.boxWidth=11;
   tip.boxHeight=11;
   tip.boxPadding=4;
 }
 if(Chart.register){
   Chart.register({id:'computeTooltipPointer',afterEvent:function(chart,args){
     var e=args&&args.event;
     if(e&&typeof e.x==='number'&&typeof e.y==='number'){
       chart.$computeTooltipPointer={x:e.x,y:e.y};
       var t=chart.canvas&&chart.canvas.parentNode&&chart.canvas.parentNode.querySelector('.compute-chart-tooltip');
       if(t&&chart.tooltip&&chart.tooltip.opacity)placeTooltip(t,chart,chart.tooltip);
     }
   }});
 }
 try{if(/\/compute\/(cardgen|embed)\b/.test(location.pathname)){Chart.defaults.animation=false;}}catch(e){}
 Chart.defaults.plugins.tooltip.usePointStyle=true;
 Chart.defaults.plugins.tooltip.boxWidth=10;
 Chart.defaults.plugins.tooltip.boxHeight=10;
 Chart.defaults.plugins.tooltip.boxPadding=5;
 Chart.defaults.plugins.tooltip.bodyFont={size:13};
 Chart.defaults.plugins.tooltip.titleFont={size:14,weight:'bold'};
 var PAL=['#161E59','#154ee3','#FF8C00','#2CA02C','#D62728','#9467BD','#17BECF','#8C564B','#E377C2','#BCBD22','#7F7F7F','#E6A817'];
 var DATA={"cited_chip": {"labels": ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"], "log": true, "ytitle": "Citations (log scale)", "series": [{"name": "All NVIDIA", "data": [1859, 4384, 9830, 14663, 20350, 29133, 44389, 40307, 44715]}, {"name": "TPU", "data": [30, 153, 231, 268, 178, 167, 1702, 1249, 1159]}, {"name": "ASICs", "data": [71, 112, 139, 130, 118, 158, 164, 218, 252]}, {"name": "FPGAs", "data": [435, 585, 799, 742, 695, 823, 1070, 1099, 1058]}, {"name": "Huawei Ascend 910", "data": [2, 4, 12, 10, 14, 15, 87, 137, 213]}, {"name": "Big 6 Startups", "data": [38, 75, 151, 135, 140, 248, 586, 587, 472]}, {"name": "Apple", "data": [null, null, null, null, null, 269, 604, 741, 998]}, {"name": "All AMD", "data": [null, null, null, null, null, 76, 264, 251, 472]}]}, "cited_nvidia": {"labels": ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"], "log": false, "ytitle": "Citations", "series": [{"name": "2080", "data": [388, 910, 2313, 3051, 3032, 2970, 3261, 1733, 1549]}, {"name": "RTX 3090", "data": [0, 0, 199, 1191, 3439, 6461, 8156, 5842, 4521]}, {"name": "4090", "data": [null, null, null, null, 248, 829, 4400, 6003, 6557]}, {"name": "5060/70/90", "data": [null, null, null, null, null, null, null, 772, 1784]}, {"name": "K80", "data": [464, 542, 669, 535, 343, 203, 137, 75, 65]}, {"name": "P100", "data": [477, 842, 1163, 1102, 1001, 753, 629, 472, 303]}, {"name": "V100", "data": [353, 1626, 4059, 6341, 7388, 7548, 6772, 3615, 2381]}, {"name": "A100", "data": [0, 0, 111, 746, 3083, 8392, 17384, 15266, 15327]}, {"name": "H100/200", "data": [null, null, null, null, 31, 160, 1905, 4653, 9823]}, {"name": "B100/200/300", "data": [null, null, null, null, null, null, null, 202, 902]}, {"name": "Titan", "data": [0, 161, 871, 1108, 1226, 1298, 982, 617, 468]}, {"name": "Jetson", "data": [177, 303, 445, 589, 559, 519, 763, 1057, 1253]}]}, "cited_startup": {"labels": ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"], "log": false, "ytitle": "Citations", "series": [{"name": "Habana", "data": [0, 15, 30, 24, 31, 19, 58, 64, 24]}, {"name": "Graphcore", "data": [8, 15, 37, 48, 48, 70, 79, 58, 40]}, {"name": "Cerebras", "data": [2, 11, 25, 18, 14, 98, 290, 224, 242]}, {"name": "Sambanova", "data": [0, 0, 11, 14, 11, 22, 42, 39, 52]}, {"name": "Cambricon", "data": [28, 34, 48, 31, 36, 34, 21, 26, 33]}, {"name": "Groq", "data": [null, null, null, null, null, 5, 96, 177, 264]}]}, "hopper": {"labels": ["xAI Colossus 1", "Tesla Cortex", "Meta GenAI clusters", "CoreWeave (one cluster)", "Voltage Park", "JUPITER Booster (Julich)", "Microsoft Eagle", "Alps (CSCS)", "AIST ABCI 3.0", "Isambard-AI (Bristol)", "NVIDIA Eos", "MareNostrum 5 (BSC)", "KAUST Shaheen III", "Venado (LANL)", "Israel-1 (NVIDIA)", "NSCC ASPIRE 2B (Singapore)", "Jean Zay (IDRIS)", "Leonardo LISA (CINECA)"], "unit": "", "series": [{"name": "Deployed", "color": "#161E59", "data": [200000, 66000, 49152, 42000, 24000, 23536, 14400, 10752, 6128, 5448, 4608, 4480, 2800, 2560, 2048, 1536, 1456, 0]}, {"name": "Installing", "color": "#154ee3", "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1328]}, {"name": "Announced", "color": "#F2A65A", "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}]}, "a100": {"labels": ["Meta Research SuperCluster", "Leonardo Booster (CINECA)", "Perlmutter (NERSC)", "Polaris (Argonne)", "Berzelius (Linkoping)", "Delta (NCSA)", "Jean Zay (IDRIS)", "NSCC ASPIRE 2A (Singapore)", "Gadi (NCI)"], "unit": "", "series": [{"name": "Deployed", "color": "#161E59", "data": [16000, 13824, 7168, 2240, 752, 440, 416, 352, 16]}]}, "blackwell": {"labels": ["IREN", "Deutsche Telekom (Munich)", "SoftBank DGX SuperPOD", "E2E Networks (India)", "SK Telecom Haein"], "unit": "", "series": [{"name": "Deployed", "color": "#161E59", "data": [0, 10000, 4000, 1024, 1000]}, {"name": "Installing", "color": "#154ee3", "data": [0, 0, 0, 0, 0]}, {"name": "Announced", "color": "#F2A65A", "data": [50000, 0, 0, 0, 0]}]}, "grace_blackwell": {"labels": ["HUMAIN (Saudi)", "Stargate Abilene (OpenAI/Oracle/Crusoe)", "South Korea (national)", "Nscale to Microsoft", "xAI Colossus 2", "Argonne Solstice+Equinox (DOE)", "Stargate Norway (Nscale/Aker)", "Together / Hypertec", "ByteDance (Malaysia, offshore)", "Stargate UAE / G42", "xAI Colossus 1", "AWS Project Ceiba", "UK Nebius/Nscale", "Mistral Bruno (France)", "Sines (Microsoft/Nscale, PT)", "Taiwan Foxconn", "IT4LIA (Bologna)", "Microsoft Azure GB300", "Microsoft Azure GB200", "HIVE/BUZZ HPC (Bell/Cohere)", "Indosat (Indonesia)", "SoftBank"], "unit": "", "series": [{"name": "Deployed", "color": "#161E59", "data": [0, 0, 0, 0, 0, 0, 0, 36000, 0, 0, 30000, 0, 0, 0, 0, 0, 0, 4608, 4000, 0, 2304, 1224]}, {"name": "Installing", "color": "#154ee3", "data": [18000, 64000, 0, 0, 110000, 10000, 0, 0, 36000, 35000, 0, 20736, 0, 13800, 12600, 0, 0, 0, 0, 2304, 0, 0]}, {"name": "Announced", "color": "#F2A65A", "data": [582000, 386000, 260000, 200000, 0, 100000, 100000, 0, 0, 0, 0, 0, 14000, 0, 0, 10000, 8000, 0, 0, 0, 0, 0]}]}, "demand": {"labels": ["OpenAI", "Anthropic"], "unit": " GW", "series": [{"name": "NVIDIA", "color": "#76B900", "data": [10, 1]}, {"name": "Non-NVIDIA", "color": "#9aa0b4", "data": [0, 5]}]}, "research_topic": {"labels": ["ASICs \u00d7 LLM", "Jetson \u00d7 LLM", "4090 \u00d7 LLM", "FPGA \u00d7 Diffusion", "FPGA \u00d7 Robotics", "Jetson \u00d7 Robotics", "H100/H200 \u00d7 LLM", "Ascend \u00d7 LLM", "MI250 \u00d7 LLM", "MI300 \u00d7 LLM"], "values": [-9.8, -6.5, -5.7, -5.6, -4.4, 19.6, 27.8, 33.9, 34.2, 42.5], "colors": ["#D62728", "#D62728", "#D62728", "#D62728", "#D62728", "#2CA02C", "#2CA02C", "#2CA02C", "#2CA02C", "#2CA02C"], "xtitle": "Skew vs corpus baseline (percentage points)"}};

 function fmtFull(v){return v==null?'':Number(v).toLocaleString('en-US');}
 function fmtK(v){v=Number(v);var a=Math.abs(v);return a>=1000?(v/1000)+'k':''+v;}
 function logTick(v){if(v<=0)return '';var p=Math.pow(10,Math.floor(Math.log10(v)+1e-9));var m=v/p;var r=Math.round(m);if((r===1||r===2||r===5)&&Math.abs(m-r)<0.02)return fmtK(v);return '';}
 function el(id){return document.getElementById(id);}
 function fade(c,a){if(typeof c==='string'&&c[0]==='#'&&c.length>=7){var n=parseInt(c.slice(1,7),16);return 'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')';}return c;}
 function lgHover(e,item,legend){var ch=legend.chart;ch.data.datasets.forEach(function(ds,j){var on=j===item.datasetIndex;var c=ds._c||ds.borderColor||ds.backgroundColor;ds.borderColor=on?c:fade(c,0.12);ds.backgroundColor=on?c:fade(c,0.12);});ch.update('none');}
 function lgLeave(e,item,legend){var ch=legend.chart;ch.data.datasets.forEach(function(ds){var c=ds._c||ds.borderColor||ds.backgroundColor;ds.borderColor=c;ds.backgroundColor=c;});ch.update('none');}
 function tooltipEl(chart){
   var parent=chart.canvas.parentNode;
   var t=parent.querySelector('.compute-chart-tooltip');
   if(t)return t;
   t=document.createElement('div');
   t.className='compute-chart-tooltip';
   t.style.position='absolute';
   t.style.opacity='0';
   t.style.pointerEvents='none';
   t.style.background='rgba(0,0,0,0.8)';
   t.style.borderRadius='6px';
   t.style.color='#fff';
   t.style.fontFamily="'PT Sans', sans-serif";
   t.style.padding='6px';
   t.style.transition='opacity .08s ease';
   t.style.zIndex='20';
   t.style.boxSizing='border-box';
   t.style.boxShadow='0 2px 6px rgba(0,0,0,.18)';
   var a=document.createElement('div');
   a.className='compute-chart-tooltip-arrow';
   a.style.position='absolute';
   a.style.width='0';
   a.style.height='0';
   t.appendChild(a);
   var c=document.createElement('div');
   c.className='compute-chart-tooltip-content';
   t.appendChild(c);
   parent.appendChild(t);
   return t;
 }
 function hideOtherTooltips(t){
   var tips=document.querySelectorAll('.compute-chart-tooltip');
   for(var i=0;i<tips.length;i++)if(tips[i]!==t)tips[i].style.opacity='0';
 }
 function setTooltipArrow(t,tooltip){
   var a=t.querySelector('.compute-chart-tooltip-arrow');
   var x=tooltip.xAlign||'center', y=tooltip.yAlign||'center';
   a.style.border='0';
   a.style.left='auto';a.style.right='auto';a.style.top='auto';a.style.bottom='auto';
   if(y==='center'&&x==='left'){
     a.style.left='-7px';a.style.top=Math.max(8,Math.min(t.offsetHeight-8,tooltip.caretY-tooltip.y))+'px';a.style.transform='translateY(-50%)';
     a.style.borderTop='7px solid transparent';a.style.borderBottom='7px solid transparent';a.style.borderRight='7px solid rgba(0,0,0,0.8)';
   }else if(y==='center'&&x==='right'){
     a.style.right='-7px';a.style.top=Math.max(8,Math.min(t.offsetHeight-8,tooltip.caretY-tooltip.y))+'px';a.style.transform='translateY(-50%)';
     a.style.borderTop='7px solid transparent';a.style.borderBottom='7px solid transparent';a.style.borderLeft='7px solid rgba(0,0,0,0.8)';
   }else if(y==='top'){
     a.style.left=Math.max(8,tooltip.caretX-tooltip.x-7)+'px';a.style.top='-7px';a.style.transform='none';
     a.style.borderLeft='7px solid transparent';a.style.borderRight='7px solid transparent';a.style.borderBottom='7px solid rgba(0,0,0,0.8)';
   }else{
     a.style.left=Math.max(8,tooltip.caretX-tooltip.x-7)+'px';a.style.bottom='-7px';a.style.transform='none';
     a.style.borderLeft='7px solid transparent';a.style.borderRight='7px solid transparent';a.style.borderTop='7px solid rgba(0,0,0,0.8)';
   }
 }
 function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
 function tooltipAnchor(chart,tooltip){
   var ev=chart.$computeTooltipPointer||tooltip._eventPosition, pts=tooltip.dataPoints||tooltip._tooltipItems||[], best=null, bestDist=Infinity;
   if(ev&&pts.length){
     pts.forEach(function(p){
       var dataIndex=p.dataIndex==null?p.index:p.dataIndex;
       var meta=chart.getDatasetMeta&&chart.getDatasetMeta(p.datasetIndex);
       var el=p.element||(meta&&meta.data&&meta.data[dataIndex]);if(!el)return;
       var pos=el.getProps?el.getProps(['x','y'],true):el;
       if(typeof pos.x!=='number'||typeof pos.y!=='number')return;
       var dx=pos.x-ev.x, dy=pos.y-ev.y, dist=dx*dx+dy*dy;
       if(dist<bestDist){bestDist=dist;best={x:pos.x,y:pos.y};}
     });
   }
   return best||{x:tooltip.caretX,y:tooltip.caretY};
 }
 function placeTooltip(t,chart,tooltip){
   var anchor=tooltipAnchor(chart,tooltip), gap=10, w=t.offsetWidth, h=t.offsetHeight;
   var xAlign=anchor.x+gap+w<=chart.width?'left':'right';
   var x=xAlign==='left'?anchor.x+gap:anchor.x-gap-w;
   var y=anchor.y-h/2;
   x=clamp(x,0,Math.max(0,chart.width-w));
   y=clamp(y,0,Math.max(0,chart.height-h));
   var placed={x:x,y:y,xAlign:xAlign,yAlign:'center',caretX:anchor.x,caretY:anchor.y};
   t.style.left=x+'px';
   t.style.top=y+'px';
   setTooltipArrow(t,placed);
 }
 function externalTooltip(ctx){
   var chart=ctx.chart, tooltip=ctx.tooltip, t=tooltipEl(chart);
   if(!tooltip||tooltip.opacity===0){t.style.opacity='0';return;}
   hideOtherTooltips(t);
   var c=t.querySelector('.compute-chart-tooltip-content');
   c.textContent='';
   (tooltip.title||[]).forEach(function(line){
     var title=document.createElement('div');
     title.textContent=line;
     title.style.fontSize='14px';
     title.style.fontWeight='700';
     title.style.lineHeight='1.25';
     title.style.marginBottom='6px';
     c.appendChild(title);
   });
   (tooltip.body||[]).forEach(function(body,i){
     var row=document.createElement('div');
     row.style.display='flex';
     row.style.alignItems='center';
     row.style.gap='6px';
     row.style.fontSize='13px';
     row.style.lineHeight='1.25';
     var col=tooltip.labelColors[i]||{};
     var box=document.createElement('span');
     box.style.display='inline-block';
     box.style.width='11px';
     box.style.height='11px';
     box.style.flex='0 0 11px';
     box.style.background=col.backgroundColor||'#161E59';
     box.style.border='1px solid '+(col.borderColor||'#fff');
     box.style.boxSizing='border-box';
     var text=document.createElement('span');
     text.textContent=(body.lines||[]).join(' ');
     row.appendChild(box);
     row.appendChild(text);
     c.appendChild(row);
   });
   placeTooltip(t,chart,tooltip);
   t.style.opacity='1';
 }
 function makeLine(id,d){var c=el(id);if(!c)return;new Chart(c,{type:'line',
   data:{labels:d.labels,datasets:d.series.map(function(s,i){var col=PAL[i%PAL.length];return{label:s.name,data:s.data,_c:col,borderColor:col,backgroundColor:col,borderWidth:2,pointRadius:2,pointHoverRadius:4,tension:0.25,spanGaps:false};})},
   options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
     scales:{x:{grid:{display:false}},y:{type:d.log?'logarithmic':'linear',title:{display:true,text:d.ytitle},ticks:{maxTicksLimit:14,autoSkip:true,callback:function(v){return d.log?logTick(v):fmtK(v);}}}},
     plugins:{legend:{position:'right',labels:{boxWidth:12,boxHeight:12,font:{size:13}},onHover:lgHover,onLeave:lgLeave},
       tooltip:{callbacks:{label:function(ctx){return ctx.dataset.label+': '+fmtFull(ctx.parsed.y);}}}}}});}
 function makeStacked(id,d){var c=el(id);if(!c)return;new Chart(c,{type:'bar',
   data:{labels:d.labels,datasets:d.series.map(function(s){return{label:s.name,data:s.data,_c:s.color,backgroundColor:s.color,borderWidth:0,borderRadius:2};})},
   options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
     scales:{x:{stacked:true,ticks:{callback:function(v){return fmtK(v)+(d.unit||'');}}},y:{stacked:true,ticks:{font:{size:13},autoSkip:false}}},
     plugins:{legend:{position:'top',labels:{boxWidth:12,boxHeight:12,font:{size:13}},onHover:lgHover,onLeave:lgLeave},
       tooltip:{callbacks:{label:function(ctx){return ctx.dataset.label+': '+fmtFull(ctx.parsed.x)+(d.unit||'');}}}}}});}
 function makeDiverging(id,d){var c=el(id);if(!c)return;new Chart(c,{type:'bar',
   data:{labels:d.labels,datasets:[{data:d.values,backgroundColor:d.colors,borderWidth:0,borderRadius:2}]},
   options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
     scales:{x:{title:{display:true,text:d.xtitle},grid:{color:function(ctx){return ctx.tick&&ctx.tick.value===0?'#888':'#eee';}}},y:{ticks:{font:{size:13},autoSkip:false}}},
     plugins:{legend:{display:false},tooltip:{callbacks:{label:function(ctx){var v=ctx.parsed.x;return (v>=0?'+':'')+v+' pp';}}}}}});}
 function init(){
   makeLine('chart-cited-chip',DATA.cited_chip);
   makeLine('chart-cited-nvidia',DATA.cited_nvidia);
   makeLine('chart-cited-startup',DATA.cited_startup);
   makeStacked('chart-hopper',DATA.hopper);
   makeStacked('chart-a100',DATA.a100);
   makeStacked('chart-blackwell',DATA.blackwell);
   makeStacked('chart-grace-blackwell',DATA.grace_blackwell);
   makeStacked('chart-demand',DATA.demand);
   makeDiverging('chart-research-topic',DATA.research_topic);
 }
 if(document.readyState!=='loading'){init();}else{document.addEventListener('DOMContentLoaded',init);}
})();

/* ---- chart toolbar UI (share / download / embed) ---- */
(function(){
  var SITE='https://www.stateof.ai';
  function cv(slug){return document.getElementById('chart-'+slug);}
  function closeMenus(){var m=document.querySelectorAll('.chart-menu');for(var i=0;i<m.length;i++)m[i].remove();}
  function chartTitle(tools){var g=tools&&tools.closest('.graph');var t=g&&g.querySelector('.graph-title');return t?t.textContent.trim():'State of AI Report Compute Index';}
  function chartDate(tools){var g=tools&&tools.closest('.graph');var d=g&&g.querySelector('.graph-date');return d?d.textContent.trim():'';}
  function composeExport(slug,title,date){
    var c=cv(slug); if(!c)return null;
    var dispW=(c.getBoundingClientRect&&c.getBoundingClientRect().width)||c.clientWidth||0;
    var dpr=dispW?(c.width/dispW):(window.devicePixelRatio||1); if(!dpr||dpr<1){dpr=window.devicePixelRatio||1;}
    var W=c.width, H=c.height, m=Math.round(16*dpr), titleH=Math.round(60*dpr), footH=Math.round(46*dpr);
    var out=document.createElement('canvas'); out.width=W+m*2; out.height=titleH+H+footH;
    var x=out.getContext('2d');
    x.fillStyle='#ffffff'; x.fillRect(0,0,out.width,out.height);
    x.textBaseline='middle'; x.textAlign='left';
    x.fillStyle='#161E59'; x.font='700 '+Math.round(22*dpr)+"px 'PT Sans',sans-serif";
    x.fillText(title, m, Math.round(titleH*0.42));
    if(date){ x.fillStyle='#6b7280'; x.font='400 '+Math.round(13*dpr)+"px 'PT Sans',sans-serif"; x.fillText(date, m, Math.round(titleH*0.76)); }
    x.drawImage(c, m, titleH);
    var lineY=titleH+H+Math.round(footH*0.26);
    x.strokeStyle='#e3e6ee'; x.lineWidth=Math.max(1,Math.round(dpr));
    x.beginPath(); x.moveTo(m,lineY); x.lineTo(out.width-m,lineY); x.stroke();
    var fy=titleH+H+Math.round(footH*0.62);
    var wm='STATE OF AI REPORT COMPUTE INDEX', maxW=out.width*0.62, fpx=Math.round(17*dpr);
    x.textAlign='left'; x.textBaseline='middle';
    x.font='400 '+fpx+"px 'Francois One','PT Sans',sans-serif";
    while(x.measureText(wm).width>maxW && fpx>8){fpx-=1; x.font='400 '+fpx+"px 'Francois One','PT Sans',sans-serif";}
    x.fillStyle='#161E59'; x.fillText(wm, m, fy);
    var ww=x.measureText(wm).width, sq=Math.round(fpx*0.36);
    x.fillStyle='#ff9900'; x.fillRect(m+ww+Math.round(fpx*0.16), fy-Math.round(sq*0.4), sq, sq);
    x.textAlign='right'; x.fillStyle='#6b7280'; x.font='400 '+Math.round(13*dpr)+"px 'PT Sans',sans-serif";
    x.fillText('stateof.ai', out.width-m, fy);
    return out;
  }
  function dataURLtoFile(d,name){var a=d.split(','),mime=(a[0].match(/:(.*?);/)||[])[1]||'image/png',bs=atob(a[1]),n=bs.length,u8=new Uint8Array(n);while(n--){u8[n]=bs.charCodeAt(n);}return new File([u8],name,{type:mime});}
  function drawExport(slug,title,date){
    var out=composeExport(slug,title,date); if(!out)return;
    var a=document.createElement('a'); a.href=out.toDataURL('image/png'); a.download='stateofai-compute-'+slug+'.png';
    document.body.appendChild(a); a.click(); a.remove();
  }
  function downloadPng(slug,title,date){ title=title||'State of AI Report Compute Index';
    function go(){requestAnimationFrame(function(){requestAnimationFrame(function(){drawExport(slug,title,date);});});}
    if(document.fonts&&document.fonts.ready){try{document.fonts.load("700 20px 'PT Sans'");document.fonts.load("400 20px 'Francois One'");}catch(e){} document.fonts.ready.then(go);}
    else{go();}
  }
  function openMenu(btn,html){
    closeMenus();
    var m=document.createElement('div'); m.className='chart-menu'; m.innerHTML=html;
    btn.parentNode.appendChild(m);
    setTimeout(function(){
      function onDoc(e){ if(!m.contains(e.target)&&e.target!==btn){ m.remove(); document.removeEventListener('click',onDoc);} }
      document.addEventListener('click',onDoc);
    },0);
  }
  function shareText(title){return title+'\n\nDiscover more AI compute trends on @stateofaireport’s Compute Index';}
  function shareFallback(slug,title,btn){
    var url=SITE+'/compute/share/'+slug; var txt=shareText(title);
    openMenu(btn,
      '<a target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text='+encodeURIComponent(txt)+'&url='+encodeURIComponent(url)+'">X / Twitter</a>'+
      '<a target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(url)+'">LinkedIn</a>'+
      '<button type="button" class="cm-copy" data-copy="'+url+'">Copy link</button>');
  }
  function shareChart(slug,title,date,btn){ shareFallback(slug,title,btn); }
  function embed(slug,h,btn){
    var snip='<iframe src="'+SITE+'/compute/embed/'+slug+'" width="100%" height="'+(h+24)+'" style="border:0" loading="lazy" title="State of AI Compute Index"></iframe>';
    var esc=snip.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    var attr=snip.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
    openMenu(btn,'<div class="embed-box"><textarea readonly rows="3">'+esc+'</textarea><button type="button" class="cm-copy" data-copy="'+attr+'">Copy embed code</button></div>');
  }
  document.addEventListener('click',function(e){
    var t=e.target;
    var cp=t.closest&&t.closest('.cm-copy');
    if(cp){ if(navigator.clipboard)navigator.clipboard.writeText(cp.getAttribute('data-copy')); cp.textContent='Copied!'; e.preventDefault(); e.stopPropagation(); return; }
    var dl=t.closest&&t.closest('.cm-dl');
    if(dl){ var s=dl.getAttribute('data-slug'); var tl=document.querySelector('.chart-tools[data-slug="'+s+'"]'); downloadPng(s, chartTitle(tl), chartDate(tl)); closeMenus(); e.preventDefault(); e.stopPropagation(); return; }
    var b=t.closest&&t.closest('.chart-btn');
    if(b){ var tools=b.closest('.chart-tools'); var slug=tools.getAttribute('data-slug'); var h=parseInt(tools.getAttribute('data-h'),10)||420; var act=b.getAttribute('data-act');
      if(act==='download')downloadPng(slug, chartTitle(tools), chartDate(tools)); else if(act==='share')shareChart(slug, chartTitle(tools), chartDate(tools), b); else if(act==='embed')embed(slug,h,b);
      e.preventDefault(); e.stopPropagation(); return; }
  });
})();
