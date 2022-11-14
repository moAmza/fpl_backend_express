import dotenv from "dotenv";
import { configServer } from "./configs/server-config";
import { deployInfrastructure } from "./configs/infrastructure-config";
import { initDomain } from "./inits/domain-init";

const run = async (envirenment: environment) => {
  dotenv.config();

  const { sequelize, redis } = await deployInfrastructure(envirenment);
  const { routers, components } = initDomain(sequelize, redis);
  const app = configServer(routers);

  app.listen(envirenment);
  components.batchComponent.schedule(envirenment);
};

run("production").catch((err) =>
  console.log("Something bad has happend in the index.ts ", err)
);
