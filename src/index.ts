import dotenv from "dotenv";
import { configServer } from "./config/server-config";
import { deployInfrastructure } from "./config/infrastructure-config";
import { initDomain } from "./init/domain-init";

const run = async (envirenment: environment) => {
  dotenv.config();

  const { sequelize, redis } = await deployInfrastructure(envirenment);
  const { routers, components } = initDomain(sequelize, redis);
  const app = configServer(routers);

  app.listen();
  components.batchComponent.schedule();
};

run("production").catch((err) =>
  console.log("Something bad has happend in the index.ts ", err)
);
