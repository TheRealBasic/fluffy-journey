export type DiagnosticAction =
  | 'Visual inspection' | 'OBD scan' | 'Compression test' | 'Smoke test' | 'Brake inspection'
  | 'Multimeter test' | 'Test drive' | 'Fuel pressure test';

export type RepairAction =
  | 'Battery replacement' | 'Alternator replacement' | 'Ground wire fix' | 'Starter replacement'
  | 'Fuel pump replacement' | 'Ignition coil replacement' | 'Brake pads replacement'
  | 'Wheel cylinder replacement' | 'Exhaust patch' | 'Lambda sensor replacement'
  | 'Throttle cleaning' | 'Timing belt replacement' | 'Fluid top-up' | 'Dodgy fix';

export type Fault = { id:string; name:string; symptoms:string[]; goodDiagnostics:DiagnosticAction[]; goodRepairs:RepairAction[]; wrongRepairs:RepairAction[]; severity:number; complaintRisk:number; };
export type CarJob = { id:string; carName:string; condition:number; mileage:number; personality:string; symptoms:string[]; faults:Fault[]; budget:number; deadline:number; patience:number; bonus:number; message:string; hints:string[]; resolved:string[]; modeTag?:string; };
export type Upgrade = { id:string; name:string; cost:number; desc:string; effect:'speed'|'stress'|'rep'|'parts'; amount:number };
