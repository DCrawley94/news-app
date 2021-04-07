exports.queryCleaner = (queryObj) => {
  const newQuery = { ...queryObj };
  for (let query in newQuery) {
    if (!newQuery[query]) {
      delete newQuery[query];
    }
  }
  return newQuery;
};
