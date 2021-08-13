const filterArrayByQuery = (array, query) => {
  const filteredArray = array.filter(
    (entry) =>
      entry[0].toLowerCase().includes(query.toLowerCase()) ||
      entry[4].toLowerCase().includes(query.toLowerCase()) ||
      entry[5].toLowerCase().includes(query.toLowerCase())
  );

  return filteredArray;
};

export default filterArrayByQuery;
