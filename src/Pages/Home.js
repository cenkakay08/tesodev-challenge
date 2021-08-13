import "../Style/App.css";
import JsonData from "../Data/mockData.json";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StyledInput } from "../Style/StyledComponents";
import filterArrayByQuery from "../Functions/filterArrayByQuery";

const Home = () => {
  const [errorColor, setErrorColor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultsSuggestions, setResultsSuggestions] = useState(null);
  const [allEntries, setAllEntries] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      const filteredEntries = filterArrayByQuery(allEntries, e.target.value);
      if (filteredEntries.length === 0) {
        setResultsSuggestions(null);
        setErrorColor(true);
      } else {
        setResultsSuggestions(filteredEntries);
        setErrorColor(false);
      }
    } else {
      setResultsSuggestions(null);
    }
  };

  useEffect(() => {
    setAllEntries(JsonData.data);
  }, []);

  return (
    <div className="Home">
      <div className="LogoTitle">
        <img id="MainLogo" src="./MainLogo.png" alt="logo" />
        <div id="LogoText">Search web app</div>
      </div>
      <div className="Search">
        <StyledInput
          id="MainSearchInput"
          onChange={handleInputChange}
          errorColor={errorColor}
        ></StyledInput>
        <Link
          to={{
            pathname: "/search",
            state: {
              searchQuery: searchTerm || "",
              results: resultsSuggestions,
            },
          }}
        >
          <button id="MainSearchButton">Search</button>
        </Link>

        {resultsSuggestions ? (
          <div id="SuggestionBox">
            {resultsSuggestions.map((entry, index) => {
              if (index < 3) {
                return (
                  <div className="SuggestionContainer" key={index}>
                    <div className="FirstLineSuggestion">
                      <div className="CountryAndCity">
                        {entry[4] + " - " + entry[5]}
                      </div>
                      <div className="Email">{"Email: " + entry[2]}</div>
                    </div>
                    <div className="SecondLine">
                      <div id="NameAndYear" className="NameAndYear">
                        {entry[0] + " - " + entry[3].substring(6, 10)}
                      </div>
                    </div>
                    <hr className="HrLine" />
                  </div>
                );
              } else if (index === 3) {
                return (
                  <div id="ShowMoreContainer" key={index}>
                    <Link
                      id="ShowMore"
                      key={index}
                      to={{
                        pathname: "/search",
                        state: {
                          searchQuery: searchTerm || "",
                          results: resultsSuggestions,
                        },
                      }}
                    >
                      Show More...
                    </Link>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        ) : null}
        {errorColor ? <div id="MainErrorText">Error text</div> : null}
      </div>
    </div>
  );
};

export default Home;
