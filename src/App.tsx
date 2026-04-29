import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { diagnostics, repairs } from './data/gameData';
import { achievements, upgrades, useGame } from './store/gameStore';

const Btn=({t,on}:{t:string;on:()=>void})=><button aria-label={t} onClick={on} className='px-3 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm'>{t}</button>;

export default function App(){const g=useGame();
useEffect(()=>{const h=(e:KeyboardEvent)=>{if(e.key==='r') g.release(); if(e.key==='n') g.nextDay(); if(e.key==='a') g.callAssar(); if(e.key==='h') g.callAtlas();};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h);},[g]);
if(g.mode==='menu') return <main className='p-6 text-zinc-100 min-h-screen bg-zinc-900'><h1 className='text-4xl font-black text-emerald-400'>Garage Chaos Simulator</h1><p className='my-4'>Run a cursed British garage for 30 days.</p><div className='flex gap-3'>{['career','endless','daily'].map(m=><Btn key={m} t={m} on={()=>g.start(m as any)} />)}</div><button className='mt-6 underline' onClick={g.reset}>Reset Save</button></main>;
return <main className='min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-zinc-100 p-3 md:p-6'>
<div className='flex flex-wrap gap-2 mb-3 text-sm'><span>Day {g.day}</span><span>£{g.money}</span><span>Rep {g.rep}</span><span>Stress {g.stress}</span><span>Time {g.time}m</span><span>Tool {g.tool}%</span><span>Parts {g.parts}</span><span>Angry {g.angry}</span></div>
{g.mode==='gameover'&&<section className='p-4 bg-red-900 rounded'><h2 className='text-2xl'>Game Over</h2><p>Jobs done: {g.done}</p><Btn t='Back to menu' on={g.reset}/></section>}
{g.mode!=='gameover'&&g.current&&<div className='grid md:grid-cols-3 gap-3'>
<motion.section initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className='bg-zinc-950/70 p-3 rounded border border-emerald-500/30 md:col-span-2'>
<h2 className='font-bold text-xl'>{g.current.carName}</h2><p>{g.current.message}</p><p>Condition {g.current.condition}% • {g.current.mileage} miles • budget £{g.current.budget}</p><p>Symptoms: {g.current.symptoms.join(', ')}</p><div className='mt-2 flex gap-2 flex-wrap'><Btn t='Call Assar (daily)' on={g.callAssar}/><Btn t='Atlas Advice (job)' on={g.callAtlas}/><Btn t='Release Car' on={g.release}/><Btn t='Next Day' on={g.nextDay}/><Btn t='Upgrades' on={()=>useGame.setState({mode:'upgrades'})}/></div>
</motion.section>
<section className='bg-zinc-950/70 p-3 rounded'><h3>Queue</h3>{g.queue.map(q=><div key={q.id} className='text-xs border-b border-zinc-700 py-1'>{q.carName}</div>)}</section>
<section className='bg-zinc-950/70 p-3 rounded'><h3>Diagnostics</h3><div className='flex flex-wrap gap-2 mt-2'>{diagnostics.map(d=><Btn key={d} t={d} on={()=>g.diag(d)} />)}</div></section>
<section className='bg-zinc-950/70 p-3 rounded'><h3>Repairs</h3><div className='flex flex-wrap gap-2 mt-2'>{repairs.map(r=><Btn key={r} t={r} on={()=>g.repair(r)} />)}</div></section>
<section className='bg-zinc-950/70 p-3 rounded'><h3>Repair log</h3>{g.log.slice(0,10).map((l,i)=><div key={i} className='text-xs'>{l}</div>)}</section>
</div>}
{g.mode==='upgrades'&&<div className='mt-4 bg-zinc-950 p-3 rounded'><h3>Upgrades</h3><div className='grid md:grid-cols-2 gap-2'>{upgrades.map(u=><button key={u.id} onClick={()=>g.buy(u.id)} className='text-left border p-2 rounded border-zinc-600'>{u.name} (£{u.cost}) {g.unlocked.includes(u.id)?'✅':''}</button>)}</div><Btn t='Back' on={()=>useGame.setState({mode:'career'})}/></div>}
<div className='mt-3 text-xs'>Achievements: {achievements.filter((_,i)=>g.done>i*2).join(' • ')||'None yet'}</div>
</main>}
