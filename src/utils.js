exports.queryCleaner = (queryObj) => {
  const newQuery = { ...queryObj };
  for (let query in newQuery) {
    if (!newQuery[query]) {
      delete newQuery[query];
    }
  }
  return newQuery;
}; //didn't need this in the end
