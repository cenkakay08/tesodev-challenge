import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import JsonData from "../Data/mockData.json";
import Entries from "../Components/Entries";
import Pagination from "../Components/Pagination";
import { StyledSubInput } from "../Style/StyledComponents";
import filterArrayByQuery from "../Functions/filterArrayByQuery";
import sortArrayByType from "../Functions/sortArrayByType";

const Search = () => {
  const location = useLocation();
  const sortMenuRef = useRef();

  const [errorColor, setErrorColor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortOpened, setIsSortOpened] = useState(false);
  const [entries, setEntries] = useState([]);
  const [untouchedEntries, setUntouchedEntries] = useState([]);
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(6);

  const handleInputChange = (e) => {
    const filtered = filterArrayByQuery(untouchedEntries, e.target.value);
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
  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (
        isSortOpened &&
        sortMenuRef.current &&
        !sortMenuRef.current.contains(e.target)
      ) {
        setIsSortOpened(false);
      }
    };
    document.addEventListener("mousedown", handleOutSideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [isSortOpened]);

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
            key={searchTerm}
          ></StyledSubInput>
          <button id="SubSearchButton">Search</button>
        </div>
        {errorColor ? <div id="SubErrorText">Error text</div> : null}
      </div>

      <div id="Pagination">
        {entries.length !== 0 ? (
          <div className="Sort">
            <div onClick={() => setIsSortOpened(true)}>
              <img id="SortIcon" src="./SortIcon.png" alt="SortIcon"></img>
              <span id="SortText">Order By</span>
            </div>
          </div>
        ) : null}

        {isSortOpened ? (
          <div className="SortMenu" ref={sortMenuRef}>
            <div
              className="SortMenuText"
              onClick={() => {
                const sorted = sortArrayByType(entries, "NameAsc");
                setEntries(sorted);
                setIsSortOpened(null);
              }}
            >
              Name Ascending
            </div>
            <div
              className="SortMenuText"
              onClick={() => {
                const sorted = sortArrayByType(entries, "NameDes");
                setEntries(sorted);
                setIsSortOpened(null);
              }}
            >
              Name Descending
            </div>
            <div
              className="SortMenuText"
              onClick={() => {
                const sorted = sortArrayByType(entries, "YearAsc");
                setEntries(sorted);
                setIsSortOpened(null);
              }}
            >
              Year Ascending
            </div>
            <div
              className="SortMenuText"
              onClick={() => {
                const sorted = sortArrayByType(entries, "YearDes");
                setEntries(sorted);
                setIsSortOpened(null);
              }}
            >
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
