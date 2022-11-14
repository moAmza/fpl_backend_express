import PlayerService from "../services/player-service";
import TeamService from "../services/team-service";
import AuthService from "../services/auth-service";
import WeekService from "../services/week-service";
import FollowService from "../services/follow-service";
import FplService from "../services/fpl-service";
import VitrineService from "../services/vitrine-service";
import UserService from "../services/user-service";

export const initServices = (deps: AllRepositories): AllServisces => {
  const vitrineService = new VitrineService(
    deps.replacementLogRepo,
    deps.weekRepo,
    deps.teamRepo,
    deps.followRepo,
    deps.likeRepo,
    deps.userRepo
  );

  const playerService = new PlayerService(
    deps.playerRepo,
    deps.playerStatsRepo
  );
  const teamService = new TeamService(
    deps.recrutmentRepo,
    deps.playerRepo,
    deps.teamRepo,
    deps.replacementLogRepo,
    deps.weekRepo
  );
  const authService = new AuthService(deps.userRepo, deps.redisRepo);
  const weekService = new WeekService(deps.weekRepo);
  const followService = new FollowService(deps.followRepo, deps.userRepo);
  const fplService = new FplService(deps.fplRepo, weekService, playerService);
  const userService = new UserService(
    deps.userRepo,
    deps.followRepo,
    vitrineService
  );

  return {
    fplService,
    playerService,
    teamService,
    authService,
    weekService,
    followService,
    userService,
    vitrineService,
  };
};
