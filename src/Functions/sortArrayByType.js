const sortArrayByType = (array, type) => {
  const sorted = [...array].sort((a, b) => {
    switch (type) {
      case "NameAsc":
        return a[0].localeCompare(b[0]);
      case "NameDes":
        return b[0].localeCompare(a[0]);
      case "YearAsc":
        return (
          new Date(
            a[3].substring(6, 10),
            a[3].substring(3, 5),
            a[3].substring(0, 2)
          ) -
          new Date(
            b[3].substring(6, 10),
            b[3].substring(3, 5),
            b[3].substring(0, 2)
          )
        );
      case "YearDes":
        return (
          new Date(
            b[3].substring(6, 10),
            b[3].substring(3, 5),
            b[3].substring(0, 2)
          ) -
          new Date(
            a[3].substring(6, 10),
            a[3].substring(3, 5),
            a[3].substring(0, 2)
          )
        );
      default:
        return console.log("default case");
    }
  });
  return sorted;
};

export default sortArrayByType;
