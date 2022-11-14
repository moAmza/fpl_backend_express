interface WeekServiceInterface {
  getCurrentWeek: () => Promise<WeekOutputType>;
  refreshWeeks: (
    freshWeeks: CreateWeekInputType[]
  ) => Promise<WeekOutputType[]>;
}
