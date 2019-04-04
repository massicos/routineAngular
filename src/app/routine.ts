import { Step } from './Step';

export class Routine {
    id: number;
    name: string;
    status: string;
    steps: Step[];
  }

  export enum routineStatus {
    initial = "initial",
    stop = "stop", 
    inProgress = "inProgress", 
    failed = "failed", 
    success = "success",
    successPerfect = "successPerfect"};