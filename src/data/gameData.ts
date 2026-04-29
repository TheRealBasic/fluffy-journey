import type { DiagnosticAction, Fault, RepairAction, Upgrade } from '../types';

export const diagnostics: DiagnosticAction[] = ['Visual inspection','OBD scan','Compression test','Smoke test','Brake inspection','Multimeter test','Test drive','Fuel pressure test'];
export const repairs: RepairAction[] = ['Battery replacement','Alternator replacement','Ground wire fix','Starter replacement','Fuel pump replacement','Ignition coil replacement','Brake pads replacement','Wheel cylinder replacement','Exhaust patch','Lambda sensor replacement','Throttle cleaning','Timing belt replacement','Fluid top-up','Dodgy fix'];

const def:[string,string[],DiagnosticAction[],RepairAction[],RepairAction[]][]=[
['Dead battery',['click no start','dash resets'],['Multimeter test','Visual inspection'],['Battery replacement'],['Alternator replacement']],
['Weak alternator',['battery light','dim lamps'],['Multimeter test','Test drive'],['Alternator replacement'],['Starter replacement']],
['Bad ground',['random cut-out','flickering dash'],['Visual inspection','Multimeter test'],['Ground wire fix'],['Battery replacement']],
['Tired starter',['single click','hot crank smell'],['Visual inspection','Multimeter test'],['Starter replacement'],['Fuel pump replacement']],
['Low fuel pressure',['stalls uphill','hesitation'],['Fuel pressure test','Test drive'],['Fuel pump replacement'],['Ignition coil replacement']],
['Failed coil',['misfire','rough idle'],['OBD scan','Test drive'],['Ignition coil replacement'],['Fuel pump replacement']],
['Worn pads',['squeal on braking','long stopping'],['Brake inspection','Test drive'],['Brake pads replacement'],['Wheel cylinder replacement']],
['Leaky wheel cylinder',['spongy pedal','rear wet brake'],['Brake inspection','Visual inspection'],['Wheel cylinder replacement'],['Brake pads replacement']],
['Exhaust leak',['fumes in cabin','raspy note'],['Smoke test','Visual inspection'],['Exhaust patch'],['Lambda sensor replacement']],
['Lazy lambda sensor',['poor mpg','check engine lamp'],['OBD scan','Test drive'],['Lambda sensor replacement'],['Exhaust patch']],
['Sticky throttle',['hunting idle','flat response'],['OBD scan','Visual inspection'],['Throttle cleaning'],['Fluid top-up']],
['Timing belt wear',['chirp front','poor pull'],['Visual inspection','Compression test'],['Timing belt replacement'],['Throttle cleaning']],
['Low fluids',['temp creeping','whine on steering'],['Visual inspection','Test drive'],['Fluid top-up'],['Timing belt replacement']],
['Intermittent immobiliser',['starts then dies','key light flashing'],['OBD scan','Multimeter test'],['Ground wire fix','Battery replacement'],['Fuel pump replacement']],
['Barn find sludge',['smoke puff','sticky lifters'],['Compression test','Visual inspection'],['Fluid top-up','Throttle cleaning'],['Lambda sensor replacement']],
];

export const faults: Fault[] = Array.from({length:30}).map((_,i)=>{const b=def[i%def.length];return{id:`f${i}`,name:b[0],symptoms:b[1],goodDiagnostics:b[2],goodRepairs:b[3],wrongRepairs:b[4],severity:1+i%5,complaintRisk:0.15+(i%5)*0.09};});
const makes=['Borkley','Vauxham','Skodoodle','Toyonda','Fjord','Peughost','Cit-roan','Nis-soon'];
const models=['Rustler','Estate of Doom','TurboSulk','Nanline','Courier Catastrophe'];
export const carTemplates=Array.from({length:40}).map((_,i)=>`${makes[i%makes.length]} ${models[i%models.length]} Mk${1+i%6}`);
export const customerMessages=[
"Only misbehaves when my mother-in-law visits.","I watched a tutorial and now the fusebox hums.","Please fix before school pickup, no pressure.","It smells expensive.","The warning light winked at me.","I need cheap, fast, and perfect.",
...Array.from({length:24}).map((_,i)=>`Customer note ${i+1}: confident nonsense delivered politely.`)
];
export const randomEvents=['Parts van delayed','Tea morale miracle','Inspector surprise audit','Neighbour starts rev contest','Power dip at lunch','Local radio wants an interview','Mystery coolant puddle appears','Storm leaks through roof','Apprentice finds lost tools','Customer brings biscuits'];
export const achievements=['First Spanner','Five Honest Fixes','Ten Day Survivor','No-Complaint Day','Stress Whisperer','Chaos Controller','Legendary Delivery','Thirty Day Legend'];
export const upgrades:Upgrade[]=Array.from({length:20}).map((_,i)=>({id:`up${i}`,name:`Workshop Upgrade ${i+1}`,cost:220+i*130,desc:'Improves operations.',effect:(['speed','stress','rep','parts'] as const)[i%4],amount:1+i%3}));
