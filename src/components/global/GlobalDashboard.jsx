import React from "react";
import { useState, useEffect } from "react";
import * as d3 from "d3";

import CountriesList from "./countriesList/CountriesList";
import CountryGraphs from "./countryGraphs/CountryGraphs";
import WorldMap from "./map/WorldMap";
import "./GlobalDashboard.css";

import world from "../../util/world.json";

import {
  jhuDailyReports,
  jhuTSeriesConfirmed,
  jhuTSeriesDeaths,
  jhuTSeriesRecovered,
  uID_ISO_FIPS_LookUp_Table,
  vaccineTSeries,
} from "../../helper/links";

import { rollData } from "../../helper/rollUpData";

console.log(world);

function GlobalDashboard() {
  const [jhuData, setjhuData] = useState({
    dailyReport: [],
    seriesCases: [],
    seriesDeaths: [],
    seriesVaccines: [],
    countries: [],
    UID_ISO_FIPS_LookUp_Table: [],
    worldMap: [],
  });

  const [selected, setSelected] = useState("Afghanistan");

  useEffect(() => {
    Promise.all([
      d3.csv(jhuDailyReports),
      d3.csv(jhuTSeriesConfirmed),
      d3.csv(jhuTSeriesDeaths),
      d3.csv(jhuTSeriesRecovered),
      d3.csv(uID_ISO_FIPS_LookUp_Table),
      d3.csv(vaccineTSeries),
      // d3.json('../../util/world.json)
    ]).then((data) => {
      const tempArr = rollData(data);

      setjhuData({
        dailyReport: data[0],
        seriesCases: data[1],
        seriesDeaths: data[2],
        seriesVaccines: data[5],
        countries: tempArr,
        UID_ISO_FIPS_LookUp_Table: data[4],
        worldMap: [],
      });
    });
  }, []);

  return (
    <section id="global-dashboard">
      <aside id="countries-list">
        <CountriesList countries={jhuData.countries} />
      </aside>
      <main id="world-map">
        <WorldMap />
      </main>
      <aside id="country-graphs">
        <CountryGraphs jhuData={jhuData} selected={selected} />
      </aside>
    </section>
  );
}

export default GlobalDashboard;
