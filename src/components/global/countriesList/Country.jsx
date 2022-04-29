import React from "react";
import "./Country.css";

function Country({ data }) {
  return (
    <section className="country-card">
      <h3>{data.country}</h3>
      <div className="statistics">
        <p className="cases">Cases: {data.cases}</p>
        <p className="deaths">Deaths: {data.deaths}</p>
      </div>
    </section>
  );
}

export default Country;
