import type { DiagnosticAction, Fault, RepairAction, Upgrade } from '../types';

export const diagnostics: DiagnosticAction[] = [
  'Visual inspection','OBD scan','Compression test','Smoke test','Brake inspection','Multimeter test','Test drive','Listen for noises','Fuel pressure test',
  'Battery load test','Vacuum leak check','Thermal camera scan','Scope ignition waveform','Wheel speed sensor read','Charging system stress test'
];

export const repairs: RepairAction[] = [
  'Replace battery','Replace alternator','Fix ground wire','Replace starter','Replace fuel pump','Replace ignition coil','Replace brake pads','Replace wheel cylinder','Patch exhaust leak','Replace lambda sensor','Clean throttle body','Replace timing belt','Top up fluids','Reset ECU adaptives','Clean battery terminals','Replace crank sensor','Bleed brake system','Do nothing and hope','Dodgy fix'
];

const baseFaults = [
['bad_alternator',['battery light','weak start','dim lights'],['Multimeter test','Charging system stress test'],['Replace alternator','Replace battery']],
['dead_battery',['click no start','dash resets'],['Multimeter test','Battery load test'],['Replace battery','Clean battery terminals']],
['ground_fault',['random cutout','flickering dash'],['Multimeter test','Visual inspection'],['Fix ground wire']],
['starter_fault',['single click','hot smell'],['Visual inspection','Multimeter test'],['Replace starter']],
['fuel_pump_weak',['cranks forever','stalls uphill'],['Fuel pressure test','Test drive'],['Replace fuel pump']],
['coil_fault',['misfire','rough idle'],['OBD scan','Scope ignition waveform'],['Replace ignition coil']],
['brakes_worn',['squeal braking','long stop distance'],['Brake inspection','Test drive'],['Replace brake pads','Bleed brake system']],
['wheel_cyl_leak',['spongy pedal','rear brake wet'],['Brake inspection','Visual inspection'],['Replace wheel cylinder','Bleed brake system']],
['exhaust_leak',['raspy noise','fumes cabin'],['Smoke test','Listen for noises'],['Patch exhaust leak']],
['o2_sensor_bad',['poor mpg','check engine'],['OBD scan','Test drive'],['Replace lambda sensor','Reset ECU adaptives']],
['throttle_dirty',['hunting idle','hesitation'],['OBD scan','Visual inspection'],['Clean throttle body','Reset ECU adaptives']],
['timing_belt_worn',['chirp front','won’t rev'],['Visual inspection','Compression test'],['Replace timing belt']],
['vacuum_leak',['high idle','lean code'],['Vacuum leak check','Smoke test'],['Reset ECU adaptives']],
['crank_sensor_fault',['random stall','no rpm signal'],['OBD scan','Scope ignition waveform'],['Replace crank sensor']],
];

export const faults: Fault[] = Array.from({ length: 45 }).map((_, i) => {
  const b = baseFaults[i % baseFaults.length];
  return { id: `${b[0]}_${i}`, name: String(b[0]).replaceAll('_', ' '), symptoms: b[1] as string[], goodDiagnostics: b[2] as string[], goodRepairs: b[3] as string[], severity: 1 + (i % 5), complaintRisk: 0.1 + (i % 6) * 0.07 };
});

const makes = ['Borkley','Snorvo','Vauxham','Skodoodle','Toyonda','Peughost','Fjord','Civique'];
const models = ['Rustler','Nimbus','TurboSulk','Estate of Doom','GTi-ish','NanSpec','BarnStorm'];
export const carTemplates = Array.from({ length: 40 }).map((_, i) => `${makes[i % makes.length]} ${models[i % models.length]} ${1998 + (i % 25)}`);

export const customerMessages = [
  "It only knocks when my nan drives it.","I fixed it with Facebook advice and now there's smoke.","Battery light's on but only in Tesco car park.","Please hurry, school run in 20.","Mate said it just needs Italian tune-up.","Can you make it cheap but perfect?",
  ...Array.from({ length: 24 }).map((_, i) => `Customer rant #${i + 1}: very specific and mildly cursed.`)
];

export const randomEvents = ['Power cut tea break','Inspector visit','Free biscuit morale boost','Parts van late','Shop cat sleeps on bonnet','Rain leak on bay 2','Neighbour rev war','Local influencer livestream','Torque wrench vanished','Mystery coolant puddle'];
export const achievements = ['First MOT-ivation','Five jobs alive','Ten-day survivor','Legendary save','No complaint day','Grease lightning','Nan-approved fix','Chaos tamer'];
export const upgrades: Upgrade[] = Array.from({ length: 20 }).map((_, i) => ({ id: `up${i}`, name: [`Faster scanner`,`Premium spanners`,`Apprentice Kev`,`Calm playlist`,`Better lighting`][i % 5] + ` ${Math.floor(i / 5) + 1}`, cost: 200 + i * 120, desc: 'Improves speed, stress, or payout.', effect: i % 3 }));
