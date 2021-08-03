import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import JsonData from "../Data/mockData.json";
import Entries from "../Components/Entries";
import Pagination from "../Components/Pagination";
import { StyledSubInput } from "../Style/StyledComponents";

const Search = () => {
  const location = useLocation();

  const [errorColor, setErrorColor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortOpened, setIsSortOpened] = useState(false);
  const [entries, setEntries] = useState([]);
  const [untouchedEntries, setUntouchedEntries] = useState([]);
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(6);

  const sortByNameAscending = () => {
    const sortedByNameAscending = [...entries].sort(function (a, b) {
      return a[0].localeCompare(b[0]);
    });
    setEntries(sortedByNameAscending);
    setIsSortOpened(false);
  };
  const sortByNameDescending = () => {
    const sortedByNameDescending = [...entries].sort(function (a, b) {
      return b[0].localeCompare(a[0]);
    });
    setEntries(sortedByNameDescending);
    setIsSortOpened(false);
  };
  const sortByYearAscending = () => {
    const sortedByYearAscending = [...entries].sort(function (b, a) {
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
    });
    setEntries(sortedByYearAscending);
    setIsSortOpened(false);
  };
  const sortByYearDescending = () => {
    const sortedByYearDescending = [...entries].sort(function (a, b) {
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
    });
    setEntries(sortedByYearDescending);
    setIsSortOpened(null);
  };
  const handleInputChange = (e) => {
    const filtered = untouchedEntries.filter(
      (entry) =>
        entry[0].toLowerCase().includes(e.target.value.toLowerCase()) ||
        entry[4].toLowerCase().includes(e.target.value.toLowerCase()) ||
        entry[5].toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (e.target.value.length > 0 && filtered.length === 0) {
      setErrorColor(true);
    } else {
      setErrorColor(false);
    }
    setEntries(filtered);
    paginate(1);
  };

  useEffect(() => {
    setUntouchedEntries(JsonData.data);
    const { searchQuery, results } = location.state;
    setSearchTerm(searchQuery);
    if (searchQuery.length === 0) {
      setEntries(JsonData.data);
    } else if (results !== null) {
      setEntries(results);
    } else {
      setEntries([]);
      setErrorColor(true);
    }
  }, []);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div id="MainSearchContainer">
      <div id="LogoSearchButton">
        <div>
          <img id="SubLogo" src="./SubLogo.png" alt="SubLogo"></img>

          <StyledSubInput
            id="SubSearchInput"
            errorColor={errorColor}
            defaultValue={searchTerm}
            onChange={handleInputChange}
          ></StyledSubInput>
          <button id="SubSearchButton">Search</button>
        </div>
        {errorColor ? <div id="SubErrorText">Error text</div> : null}
      </div>

      <div id="Pagination">
        {entries.length !== 0 ? (
          <div onClick={() => setIsSortOpened(true)} className="Sort">
            <img id="SortIcon" src="./SortIcon.png" alt="SortIcon"></img>
            <span id="SortText">Order By</span>
          </div>
        ) : null}

        {isSortOpened ? (
          <div className="SortMenu">
            <div className="SortMenuText" onClick={sortByNameAscending}>
              Name Ascending
            </div>
            <div className="SortMenuText" onClick={sortByNameDescending}>
              Name Descending
            </div>
            <div className="SortMenuText" onClick={sortByYearAscending}>
              Year Ascending
            </div>
            <div className="SortMenuText" onClick={sortByYearDescending}>
              Year Descending
            </div>
          </div>
        ) : null}
        <Entries entries={currentEntries} loading={loading} />
        <Pagination
          entriesPerPage={entriesPerPage}
          totalEntries={entries.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Search;
