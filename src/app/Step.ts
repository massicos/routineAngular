export class Step {
    id: number;
    name: string;
    status: string;
    time: number;
    stars: number;
  }

  export enum stepStatus {initial = "initial", inProgress = "inProgress", failed = "failed", success = "success"};