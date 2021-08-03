import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import JsonData from "../Data/mockData.json";
import Posts from "../Components/Posts";
import Pagination from "../Components/Pagination";
import { StyledSubInput } from "../Style/StyledComponents";

const Search = () => {
  const location = useLocation();

  const [errorColor, setErrorColor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortOpened, setIsSortOpened] = useState(false);
  const [posts, setPosts] = useState([]);
  const [untouchedPosts, setUntouchedPosts] = useState([]);
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const sortByNameAscending = () => {
    const sortedByNameAscending = [...posts].sort(function (a, b) {
      return a[0].localeCompare(b[0]);
    });
    setPosts(sortedByNameAscending);
    setIsSortOpened(false);
  };
  const sortByNameDescending = () => {
    const sortedByNameDescending = [...posts].sort(function (a, b) {
      return b[0].localeCompare(a[0]);
    });
    setPosts(sortedByNameDescending);
    setIsSortOpened(false);
  };
  const sortByYearAscending = () => {
    const sortedByYearAscending = [...posts].sort(function (b, a) {
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
    setPosts(sortedByYearAscending);
    setIsSortOpened(false);
  };
  const sortByYearDescending = () => {
    const sortedByYearDescending = [...posts].sort(function (a, b) {
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
    setPosts(sortedByYearDescending);
    setIsSortOpened(null);
  };
  const handleInputChange = (e) => {
    const filtered = untouchedPosts.filter(
      (post) =>
        post[0].toLowerCase().includes(e.target.value.toLowerCase()) ||
        post[4].toLowerCase().includes(e.target.value.toLowerCase()) ||
        post[5].toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (e.target.value.length > 0 && filtered.length === 0) {
      setErrorColor(true);
    } else {
      setErrorColor(false);
    }
    setPosts(filtered);
    paginate(1);
  };

  useEffect(() => {
    setUntouchedPosts(JsonData.data);
    const { searchQuery, results } = location.state;
    setSearchTerm(searchQuery);
    if (searchQuery.length === 0) {
      setPosts(JsonData.data);
    } else if (results !== null) {
      setPosts(results);
    } else {
      setPosts([]);
      setErrorColor(true);
    }
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
        {posts.length !== 0 ? (
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
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Search;
