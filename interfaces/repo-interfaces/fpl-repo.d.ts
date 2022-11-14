interface FplRepositoryInterface {
  fetchPremireLeague: () => Promise<import("fpl-api").Bootstrap>;
}
