import React from "react";
import CountryGraph from "./CountryGraph";
import { v4 as uuidv4 } from "uuid";

function CountryGraphs({ jhuData, selected }) {
  console.log(jhuData);
  return (
    <div>
      <CountryGraph
        jhuData={jhuData.seriesCases}
        type="cases"
        key={uuidv4()}
        selected={selected}
      />
      <CountryGraph
        jhuData={jhuData.seriesDeaths}
        type="deaths"
        key={uuidv4()}
        selected={selected}
      />
      {/* <CountryGraph
        jhuData={jhuData.seriesVaccines}
        type="vaccines"
        key={uuidv4()}
        selected={selected}
      /> */}
    </div>
  );
}

export default CountryGraphs;
