import React, { useEffect } from "react";

import * as d3 from "d3";

function CountryGraph({ jhuData, selected, type }) {
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  useEffect(() => {
    let dataFromCountry = jhuData.filter(
      (item) => item["Country/Region"] === selected
    );

    if (dataFromCountry.length > 0) {
      delete dataFromCountry[0]["Province/State"];
      delete dataFromCountry[0]["Country/Region"];
      delete dataFromCountry[0]["Lat"];
      delete dataFromCountry[0]["Long"];

      const cleanedData = [];

      for (const [key, value] of Object.entries(dataFromCountry[0])) {
        cleanedData.push({
          date: new Date(key),
          value: parseInt(value),
        });
      }

      console.log(cleanedData);

      buildGraph(cleanedData);
    }
  }, []);

  function buildGraph(data) {
    const svg = d3
      .select(`#${type}-graph`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +d.value;
        }),
      ])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.date);
          })
          .y(function (d) {
            return y(d.value);
          })
      );
  }

  return (
    <div id={`${type}-graph`}>
      <h1>this is a graph</h1>
    </div>
  );
}

export default CountryGraph;
