import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { diagnostics, repairs } from './data/gameData';
import { achievements, upgrades, useGame } from './store/gameStore';

const Btn=({t,on}:{t:string;on:()=>void})=><button aria-label={t} onClick={on} className='px-3 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm'>{t}</button>;

const stations=[
  {k:'bay',x:4,y:2,c:'🚗 Bay'},
  {k:'diag',x:1,y:1,c:'🧪 Diag'},
  {k:'parts',x:8,y:1,c:'📦 Parts'},
  {k:'desk',x:8,y:4,c:'🧾 Desk'},
];

export default function App(){const g=useGame(); const [p,setP]=useState({x:4,y:4});
const station = useMemo(()=>stations.find(s=>s.x===p.x&&s.y===p.y)?.k,[p]);
useEffect(()=>{const h=(e:KeyboardEvent)=>{if(g.mode==='menu'||g.mode==='gameover')return; if(e.key==='ArrowUp'||e.key==='w')setP(v=>({...v,y:Math.max(0,v.y-1)})); if(e.key==='ArrowDown'||e.key==='s')setP(v=>({...v,y:Math.min(5,v.y+1)})); if(e.key==='ArrowLeft'||e.key==='a')setP(v=>({...v,x:Math.max(0,v.x-1)})); if(e.key==='ArrowRight'||e.key==='d')setP(v=>({...v,x:Math.min(9,v.x+1)})); if(e.key==='r') g.release(); if(e.key==='n') g.nextDay();};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h);},[g]);
if(g.mode==='menu') return <main className='p-6 text-zinc-100 min-h-screen bg-zinc-900'><h1 className='text-4xl font-black text-emerald-400'>Garage Chaos Simulator</h1><p className='my-4'>Now with a pixel-style garage floor, stations, and part inventory.</p><div className='flex gap-3'>{['career','endless','daily'].map(m=><Btn key={m} t={m} on={()=>g.start(m as any)} />)}</div><button className='mt-6 underline' onClick={g.reset}>Reset Save</button></main>;

const at=(k:string)=>station===k;
return <main className='min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-zinc-100 p-3 md:p-6'>
<div className='flex flex-wrap gap-2 mb-3 text-sm'><span>Day {g.day}</span><span>£{g.money}</span><span>Rep {g.rep}</span><span>Stress {g.stress}</span><span>Time {g.time}m</span><span>Tool {g.tool}%</span><span>Combo x{g.combo}</span><span>Trust {g.trust}%</span></div>
{g.mode==='gameover'&&<section className='p-4 bg-red-900 rounded'><h2 className='text-2xl'>Game Over</h2><p>Jobs done: {g.done}</p><Btn t='Back to menu' on={g.reset}/></section>}
{g.mode!=='gameover'&&g.current&&<div className='grid md:grid-cols-3 gap-3'>
<motion.section initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className='bg-zinc-950/70 p-3 rounded border border-emerald-500/30 md:col-span-2'>
<h2 className='font-bold text-xl'>{g.current.carName}</h2><p>{g.current.message}</p><p>Symptoms: {g.current.symptoms.join(', ')}</p><p>Patience {g.current.patience}% • Budget £{g.current.budget}</p>
{g.current.hints.length>0&&<div className='text-emerald-300 text-sm mt-1'>Clues: {g.current.hints.join(' • ')}</div>}
<div className='mt-2 flex gap-2 flex-wrap'><Btn t='Call Assar' on={g.callAssar}/><Btn t='Atlas Advice' on={g.callAtlas}/><Btn t='Release Car' on={g.release}/><Btn t='Next Day' on={g.nextDay}/></div>
</motion.section>
<section className='bg-zinc-950/70 p-3 rounded'><h3>Queue</h3>{g.queue.map(q=><div key={q.id} className='text-xs border-b border-zinc-700 py-1'>{q.carName}</div>)}</section>

<section className='bg-zinc-950/70 p-3 rounded md:col-span-2'><h3>Garage Floor (WASD / Arrow keys)</h3>
<div className='grid grid-cols-10 gap-1 mt-2 bg-zinc-900 p-2 rounded'>
{Array.from({length:60}).map((_,i)=>{const x=i%10,y=Math.floor(i/10); const s=stations.find(z=>z.x===x&&z.y===y); const me=p.x===x&&p.y===y; return <div key={i} className={`h-8 rounded text-center text-xs leading-8 ${me?'bg-emerald-500 text-black font-bold':s?'bg-zinc-700':'bg-zinc-800'}`}>{me?'🧍':s?s.c.split(' ')[0]:''}</div>;})}
</div><p className='text-xs mt-2'>Stand on stations: 🧪 diagnostics, 🚗 repairs, 📦 buy parts, 🧾 release/next day.</p></section>

<section className='bg-zinc-950/70 p-3 rounded'><h3>Inventory</h3><div className='text-xs space-y-1 mt-2'><div>Battery: {g.inventory.battery}</div><div>Electrical: {g.inventory.electrical}</div><div>Brake: {g.inventory.brake}</div><div>Engine: {g.inventory.engine}</div></div>
<div className='mt-2 flex flex-wrap gap-2'>{at('parts')&&<><Btn t='Buy Battery (£80)' on={()=>g.buyPart('battery')}/><Btn t='Buy Electrical (£55)' on={()=>g.buyPart('electrical')}/><Btn t='Buy Brake (£65)' on={()=>g.buyPart('brake')}/><Btn t='Buy Engine (£95)' on={()=>g.buyPart('engine')}/></>}</div></section>

<section className='bg-zinc-950/70 p-3 rounded'><h3>Diagnostics</h3><div className='text-xs mb-2'>{at('diag')?'At diagnostic station ✅':'Move to 🧪 station to run diagnostics'}</div><div className='flex flex-wrap gap-2 mt-2'>{diagnostics.map(d=><Btn key={d} t={d} on={()=>at('diag')&&g.diag(d)} />)}</div></section>
<section className='bg-zinc-950/70 p-3 rounded'><h3>Repairs</h3><div className='text-xs mb-2'>{at('bay')?'At repair bay ✅':'Move to 🚗 bay to perform repairs'}</div><div className='flex flex-wrap gap-2 mt-2'>{repairs.map(r=><Btn key={r} t={r} on={()=>at('bay')&&g.repair(r)} />)}</div></section>
<section className='bg-zinc-950/70 p-3 rounded'><h3>Repair log</h3>{g.log.slice(0,10).map((l,i)=><div key={i} className='text-xs'>{l}</div>)}</section>
</div>}

{g.mode==='upgrades'&&<div className='mt-4 bg-zinc-950 p-3 rounded'><h3>Upgrades</h3><div className='grid md:grid-cols-2 gap-2'>{upgrades.map(u=><button key={u.id} onClick={()=>g.buy(u.id)} className='text-left border p-2 rounded border-zinc-600'>{u.name} (£{u.cost}) {g.unlocked.includes(u.id)?'✅':''}</button>)}</div><Btn t='Back' on={()=>useGame.setState({mode:'career'})}/></div>}
<div className='mt-3 text-xs'>Achievements: {achievements.filter((_,i)=>g.done>i*2).join(' • ')||'None yet'}</div>
</main>}
