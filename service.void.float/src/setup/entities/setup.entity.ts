export enum SetupStep {
  PENDING,
  INITIAL,
  NETWORK,
  REGISTER_PODS,
  SCAN_NETWORK,
}

export class Setup {
  step: SetupStep;
  serverName: string;
  serverIp: string;
  createdAt: Date;
  modifiedAt: Date;
}
