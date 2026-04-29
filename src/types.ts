export type DiagnosticAction = string;
export type RepairAction = string;
export type Fault = {id:string;name:string;symptoms:string[];goodDiagnostics:string[];goodRepairs:string[];severity:number;complaintRisk:number};
export type CarJob = {id:string;carName:string;condition:number;mileage:number;personality:string;symptoms:string[];faults:Fault[];budget:number;deadline:number;patience:number;bonus:number;message:string;hints:string[];};
export type Upgrade = {id:string;name:string;cost:number;desc:string;effect:number};
