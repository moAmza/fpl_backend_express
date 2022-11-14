import { Bootstrap } from "fpl-api";
import { FplDto } from "../dtos/fpl-dto";
import { TimeoutError } from "../errors/network-error";

class FplService implements FplServiceInterface {
  constructor(
    private fplRepo: FplRepositoryInterface,
    private weekService: WeekServiceInterface,
    private playerService: PlayerServiceInterface
  ) {}

  private getFreshDate = async (): Promise<FreshDBInputType | TimeoutError> => {
    let data: Bootstrap;
    try {
      data = await this.fplRepo.fetchPremireLeague();
    } catch (e) {
      return new TimeoutError();
    }
    const weeks = FplDto.convertWeeks(data.events);
    const players = FplDto.convertPlayers(
      data.events,
      data.elements,
      data.element_types,
      data.teams
    );

    return { weeks, players };
  };

  private refreshDB = async (freshDatas: FreshDBInputType) => {
    const { weeks, players } = freshDatas;
    console.log("data is came from fpl");
    console.log(players[0]);
    console.log(weeks[0]);

    await this.weekService.refreshWeeks(weeks);
    await this.playerService.refreshPlayers(players);
  };

  private safeGetFreshDate = async (): Promise<FreshDBInputType> => {
    let data: FreshDBInputType | TimeoutError;
    let n = 1;
    do {
      data = await this.getFreshDate();
      if (data instanceof TimeoutError) {
        console.log(`-- Error in fetching fpl data: ${n++}th try`);

        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    } while (data instanceof TimeoutError);
    return data;
  };

  updateFpl = async (): Promise<StatusOutputType<true>> => {
    const newDate = await this.safeGetFreshDate();
    await this.refreshDB(newDate);
    console.log("-- fpl data updated successfully");
    return { status: true };
  };
}

export default FplService;
