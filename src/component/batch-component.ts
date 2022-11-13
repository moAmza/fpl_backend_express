import { CronJob } from "cron";

class BatchComponent implements BatchComponentInterface {
  constructor(private services: AllServisces) {}
  schedule = () => {
    this.configedCronJob(
      process.env.FPL_TIME!,
      this.services.refreshService.refreshPremierLeagueDatas
    );
  };

  configedCronJob = (time: string, func: Function) => {
    const cron = new CronJob(time, func(), null, true, "Asia/Tehran").start();
  };
}
export default BatchComponent;
