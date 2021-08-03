import React from "react";

const Entries = ({ entries, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {entries.map((entry, index) => (
        <div className="ResultsContainer" key={index}>
          <div className="FirstLineResult">
            <div className="CountryAndCityResult">
              {entry[4] + " - " + entry[5]}
            </div>
            <div className="EmailResult">{"Email: " + entry[2]}</div>
          </div>
          <div className="SecondLineResult">
            <div id="NameAndYearResult" className="NameAndYearResult">
              {entry[0] + " - " + entry[3].substring(6, 10)}
            </div>
          </div>
          <hr className="HrLineResult" />
        </div>
      ))}
    </div>
  );
};

export default Entries;
