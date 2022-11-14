class WeekService implements WeekServiceInterface {
  constructor(private weekRepo: WeekRepositoryInterface) {}

  getCurrentWeek = async () => {
    return this.weekRepo.getCurrentWeek();
  };

  refreshWeeks = async (
    freshWeeks: CreateWeekInputType[]
  ): Promise<WeekOutputType[]> => {
    return this.weekRepo.refreshWeeks(freshWeeks);
  };
}

export default WeekService;
