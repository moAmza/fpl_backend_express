import { Bootstrap, fetchBootstrap } from "fpl-api";

export class FplRepository implements FplRepositoryInterface {
  fetchPremireLeague = async (): Promise<Bootstrap> => {
    const data = await fetchBootstrap();
    return data;
  };
}
