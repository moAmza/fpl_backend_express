import { CronJob } from "cron";

class BatchComponent implements BatchComponentInterface {
  constructor(private fplService: FplServiceInterface) {}
  schedule = () => {
    this.configedCronJob(process.env.FPL_TIME!, this.fplService.updateFpl);
  };

  private configedCronJob = (time: string, func: Function) => {
    const cron = new CronJob(time, func(), null, true, "Asia/Tehran").start();
  };
}
export default BatchComponent;
