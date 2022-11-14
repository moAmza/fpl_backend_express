import BatchComponent from "../components/batch-component";

export const initComponents = (deps: AllServisces): AllComponents => ({
  batchComponent: new BatchComponent(deps.fplService),
});
